import dotenv from 'dotenv'
dotenv.config()

const { PRIVATE_KEY, API_HTTPS } = process.env;

export default {
    solidity: "0.8.0",
    networks: {
        hardhat: {},
        sepolia: {
            url: API_HTTPS,
            accounts: [`0x${PRIVATE_KEY}`]
        }
    },
};
