export function extractContractData(contractObject) {
    // Assuming the structure of the contractObject is known and consistent
    const contracts = contractObject.contracts['Contract.sol'];
    const contractName = Object.keys(contracts)[0]; // Assuming there's only one contract in the file
    const contract = contracts[contractName];

    // Extracting required properties
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    // Constructing the result object
    const result = {
        contractName,
        abi,
        bytecode
    };

    return result;
}
