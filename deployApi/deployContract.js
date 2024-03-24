// Importa as bibliotecas necessárias

import { ethers } from "hardhat";

export async function deployContract(bytecode, abi) {
    // Conecta à rede (modifique 'ropsten' conforme necessário)
    const [deployer] = await ethers.getSigners();

    // Loga o endereço do deployer
    console.log("Deploying contracts with the account:", deployer.address);

    // Cria uma instância do contrato
    const Contract = new ethers.ContractFactory(abi, bytecode, deployer);

    // Realiza o deploy
    const contract = await Contract.deploy();

    console.log("Contract deployed to:", contract.address);
}

