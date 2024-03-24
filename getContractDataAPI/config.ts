import {
  createPublicClient,
  createWalletClient,
  defineChain,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "dotenv";

config();

export const contractAddress: string = process.env.CONTRACT_ADDRESS || "";
export const account = privateKeyToAccount(
  `0x${process.env.PRIVATE_KEY}` ?? `0x${"000"}`
);

export const scrollSepolia = defineChain({
  id: 534351,
  name: "Scroll Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://scroll-sepolia.public.blastapi.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://sepolia.scrollscan.com" },
  },
});

export const walletClient = createWalletClient({
  account,
  chain: scrollSepolia,
  transport: http("https://scroll-sepolia.public.blastapi.io"),
});

export const publicClient = createPublicClient({
  chain: scrollSepolia,
  transport: http("https://scroll-sepolia.public.blastapi.io"),
});
