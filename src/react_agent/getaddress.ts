import axios from "axios";
import { Tool } from "@langchain/core/tools";
import { TG_BOT_TOKEN } from "./configuration.js";

export class GetWalletAddressTool extends Tool {
  name = "get_wallet_address";
  description = `Get the bot's wallet address for Polygon testnet. Return the address as a string.
    Check the chat history to see if you have already fetched the address. If you have, return it.`;

  protected async _call(): Promise<string> {
    try {
      const { data } = await axios.get(
        "https://okto-gita.ngrok.app/api/v1/wallet/address",
        {
          headers: {
            "X-TG-BOT-TOKEN": TG_BOT_TOKEN || "",
          },
        }
      );

      const polygonWallet = data.wallets.find(
        (w: any) => w.network_name === "POLYGON_TESTNET_AMOY"
      );

      if (!polygonWallet) {
        return "Polygon testnet wallet not found";
      }

      return String(polygonWallet.address);
    } catch (error: any) {
      return `Error fetching wallet address: ${error.message}`;
    }
  }
}
