import { Tool } from "@langchain/core/tools";

export class CoinGeckoTrendingTool extends Tool {
  name = "coingecko_trending";
  description = `Get current trending cryptocurrency tokens from CoinGecko. Returns top 5 trending coins in JSON format.
    Format: [{"token_name": "string", "token_symbol": "string", "market_cap": "number", "rank": "number"}]`;

  protected async _call(): Promise<string> {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trending tokens");
      }

      const data = await response.json();
      const trendingCoins = data.coins.slice(0, 5).map((coin: any) => ({
        token_name: coin.item.name,
        token_symbol: coin.item.symbol,
        market_cap: coin.item.data.market_cap,
        rank: coin.item.market_cap_rank,
      }));

      return JSON.stringify(trendingCoins, null, 2);
    } catch (error: any) {
      return `Error fetching trending tokens: ${error.message}`;
    }
  }
}
