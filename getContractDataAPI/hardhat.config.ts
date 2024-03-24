import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { config as configEnv } from "dotenv";

configEnv();
const scrollSepoliaApiKey = process.env.SCROLL_SEPOLIA_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
  },
  networks: {
    sepolia: {
      url: "https://scroll-sepolia.public.blastapi.io",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: scrollSepoliaApiKey,
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
};

export default config;
