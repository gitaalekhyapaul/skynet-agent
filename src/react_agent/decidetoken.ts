import { Tool } from "@langchain/core/tools";

export class DecideTokenTool extends Tool {
  name = "decide_token";
  description = `Analyze previous tool outputs and decide which token to buy.
    Invoke this tool only after you have fetched the trending tokens with the contract addresses.
    Pass a comma separated string with symbol, contract_address and amount (random number between 0 and 1).
    Return a JSON with symbol, contract_address and amount (random number between 0 and 1).`;

  protected async _call(arg: string): Promise<string> {
    try {
      const [symbol, contract_address, amount] = arg.split(",");
      const decision = {
        symbol: String(symbol),
        contract_address: String(contract_address),
        amount: String(amount),
      };

      return JSON.stringify(decision, null, 2);
    } catch (error: any) {
      return `Error making decision: ${error.message}`;
    }
  }
}
