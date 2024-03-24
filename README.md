# ETH-SAMBA-24

- Original github [https://github.com/otaviootavio/compilaApi](https://github.com/otaviootavio/compilaApi)

This API compile the smart contract and return its ABI and Binary

- Original github [https://github.com/otaviootavio/deployApi](https://github.com/otaviootavio/deployApi)

This API receives the binary and deploy the contract on SepoliaScroll
The `.env` defines `API_HTTPS=https://scroll-sepolia.public.blastapi.io`

- Original github [https://github.com/otaviootavio/getContractDataAPI](https://github.com/otaviootavio/getContractDataAPI)

This repository do the deploy of our IPFSRegistry.sol at scroll.io and also gives a API to add or remove CIDs.

- Original github [https://github.com/gustavokuhl/de-registry-front-test](https://github.com/gustavokuhl/de-registry-front-test)

This repository does our frontend and connect all the previous APIs.
The website is live on [https://de-registry-test.vercel.app/](https://de-registry-test.vercel.app/)

## Scroll.io

We developed the IPFSRegistry.sol was build to organize the CIDs of the IPFS on scroll

It has been verified, and can be viewed at:

[https://sepolia.scrollscan.com/address/0xC0174A2319612dB9F6dF596F90374dCb92f60A05#code](https://sepolia.scrollscan.com/address/0xC0174A2319612dB9F6dF596F90374dCb92f60A05#code)

The development the IPFSRegistry this contract was made with hardhat at:

```
/getContractDataAPI/contracts/IPFSRegistry.sol
```
