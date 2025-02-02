/**
 * This file defines the tools available to the ReAct agent.
 * Tools are functions that the agent can use to interact with external systems or perform specific tasks.
 */
// import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { CoinGeckoTrendingTool } from "./coingecko.js";
import { GetWalletAddressTool } from "./getaddress.js";
import { GetContractAddressTool } from "./getcontractaddress.js";
import { DecideTokenTool } from "./decidetoken.js";
import { ExecuteTransactionTool } from "./sendtx.js";
/**
 * Tavily search tool configuration
 * This tool allows the agent to perform web searches using the Tavily API.
 */
// const searchTavily = new TavilySearchResults({
//   maxResults: 3,
// });

const coinGeckoTrending = new CoinGeckoTrendingTool();
const getWalletAddress = new GetWalletAddressTool();
const getContractAddress = new GetContractAddressTool();
const decideToken = new DecideTokenTool();
const sendTx = new ExecuteTransactionTool();
/**
 * Export an array of all available tools
 * Add new tools to this array to make them available to the agent
 *
 * Note: You can create custom tools by implementing the Tool interface from @langchain/core/tools
 * and add them to this array.
 * See https://js.langchain.com/docs/how_to/custom_tools/#tool-function for more information.
 */
export const TOOLS = [
  coinGeckoTrending,
  getWalletAddress,
  getContractAddress,
  decideToken,
  sendTx,
];
