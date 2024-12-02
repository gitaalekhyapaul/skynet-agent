import { Tool } from "@langchain/core/tools";
import { TG_BOT_TOKEN } from "./configuration.js";
import axios from "axios";
import { encodeFunctionData, Hex, parseUnits } from "viem";

const ERC20_ABI = [
  {
    name: "transfer",
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

export class ExecuteTransactionTool extends Tool {
  name = "execute_transaction";
  description = `Execute an ERC20 token transfer transaction.
  Input should be a comma-separated string with: token_address,recipient_address,amount
  Token address and amount should be the from latest verdict you had taken
  Recipient address must be your own account address which you had fetched`;

  protected async _call(input: string): Promise<string> {
    try {
      const [tokenAddress, recipientAddress, amount] = input.split(",");

      // Encode the transfer function call
      const data = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [recipientAddress as Hex, parseUnits(amount, 18)],
      });

      const response = await axios.post(
        "https://okto-gita.ngrok.app/api/v1/wallet/execute-tx",
        {
          network_name: "POLYGON_TESTNET_AMOY",
          transaction: {
            from: recipientAddress,
            to: tokenAddress,
            value: "0x0",
            data,
          },
        },
        {
          headers: {
            "X-TG-BOT-TOKEN": TG_BOT_TOKEN || "",
          },
        }
      );

      return `Transaction submitted: ${JSON.stringify(response.data)}`;
    } catch (error: any) {
      return `Error executing transaction: ${error.message}`;
    }
  }
}
