# ETH-SAMBA-24

Our project provides the authentication of documents as a service. We build this project aiming to reduce the friction to the user. To do so, we implement 3 APIs. Two are responsable to compile and deploy the contracts at Scroll. The last one focus on provinding the IPFSRegistry of both the metadata and document ( pdf file). All these is gathered at our frontend build with next.

## Folder structure

- `/compilaApi`

This file contains the smart contract and return its ABI and Binary

- `/deployApi`

This file contains the binary and deploy the contract on SepoliaScroll
The `.env` defines `API_HTTPS=https://scroll-sepolia.public.blastapi.io`

- `/getContractDataAPI`

This file contains the deploy of our IPFSRegistry.sol at scroll.io and also gives a API to add or remove CIDs at our contract.

- `/de-registry-front-test`

This file contains our frontend and connect all the previous APIs.
The website is live on [https://de-registry-test.vercel.app/](https://de-registry-test.vercel.app/)

## More about our contract at Scroll

We developed the IPFSRegistry.sol, this contracts aims to organize the CIDs of the IPFS on scroll

It has been verified, and can be viewed at:

[https://sepolia.scrollscan.com/address/0xC0174A2319612dB9F6dF596F90374dCb92f60A05#code](https://sepolia.scrollscan.com/address/0xC0174A2319612dB9F6dF596F90374dCb92f60A05#code)

The development the IPFSRegistry this contract was made with hardhat at:

```
/getContractDataAPI/contracts/IPFSRegistry.sol
```

## More about ScaffoldEth
