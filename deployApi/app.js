import express from "express";
import { compileSolidity } from './compileSolidity.js'
import { extractContractData } from './extractContractData.js'
import { Wallet, ethers } from "ethers";
import dotenv from 'dotenv'
const app = express();
const port = 3000;

dotenv.config()

// Middleware
app.use(express.json());

app.post('/compileAndDeploy', async (req, res) => {
    try {
        const { solidityCode } = req.body;

        // Compile Solidity code
        const compilationResult = await compileSolidity(solidityCode);
        const { abi, bytecode } = extractContractData(compilationResult);

        // Deploy contract
        const contractAddress = await deployContract(bytecode, abi);

        res.json({ message: 'Contract deployed successfully!', contractAddress, abi, bytecode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error compiling or deploying contract', error: error.message });
    }
});

async function deployContract(bytecode, abi) {
    // Ensure your .env file contains a valid PRIVATE_KEY and the RPC URL (API_HTTPS)
    const { PRIVATE_KEY, API_HTTPS } = process.env;

    if (!PRIVATE_KEY || !API_HTTPS) {
        throw new Error("Private key or API HTTPS endpoint is missing in the environment variables.");
    }

    // Setup provider
    const provider = new ethers.providers.JsonRpcProvider(API_HTTPS);

    // Create a Wallet signer with the private key and connect it to the provider
    const signer = new Wallet(PRIVATE_KEY, provider);

    console.log("Deploying contracts with the account:", await signer.getAddress(), "(Sepolia Network)");

    // Create contract instance and deploy
    const Contract = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await Contract.deploy();

    console.log("Contract deployed to:", contract.address);

    return contract.address;
}

app.listen(port, () => {
    console.log(`Solidity Compiler API running on port ${port}`);
});
