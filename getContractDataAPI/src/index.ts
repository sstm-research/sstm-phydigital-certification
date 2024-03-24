import express, { Request, Response } from "express";
import {
  publicClient,
  account,
  walletClient,
  contractAddress,
} from "../config";
import { abi } from "../abi";

import { scrollSepolia } from "../config";

const app = express();
const port = 3000;

app.use(express.json());

// Fetch JSON and PDF CIDs for a user address
app.get(
  "/CIDsFromContractByUserAddress",
  async (req: Request, res: Response) => {
    try {
      const cidOwnerAddress = req.query.cidOwnerAddress as string;

      if (!cidOwnerAddress) {
        return res.status(400).send("Address is required");
      }

      const jsonResponse = await publicClient.readContract({
        address: `0x${contractAddress}`,
        abi,
        functionName: "getJsonCIDs",
        args: [`0x${cidOwnerAddress}`],
        account,
      });

      const pdfResponse = await publicClient.readContract({
        address: `0x${contractAddress}`,
        abi,
        functionName: "getPdfCIDs",
        args: [`0x${cidOwnerAddress}`],
        account,
      });

      res.json({
        jsonCID: jsonResponse || "No JSON CID found",
        pdfCID: pdfResponse || "No PDF CID found",
      });
    } catch (error) {
      console.error("Failed to get CIDs:", error);
      res.status(500).send("Internal server error");
    }
  }
);

// Add JSON or PDF CID to contract
app.post("/AddCIDToContract", async (req: Request, res: Response) => {
  try {
    const { cidOwnerAddress, jsonCID, pdfCID } = req.body;

    if (!cidOwnerAddress || (!jsonCID && !pdfCID)) {
      return res
        .status(400)
        .send("Owner address and at least one CID (JSON or PDF) are required");
    }

    if (jsonCID) {
      await addCIDToContractSetMyJsonCID(jsonCID, cidOwnerAddress, res);
    }

    if (pdfCID) {
      await addCIDToContractSetMyPdfCID(pdfCID, cidOwnerAddress, res);
    }

    res.status(201).send("CID(s) successfully added to contract");
  } catch (error) {
    console.error("Failed to add CID(s):", error);
    res.status(500).send("Internal server error");
  }
});

async function addCIDToContractSetMyJsonCID(
  cid: string,
  cidOwnerAddress: string,
  res: Response
) {
  const { request } = await publicClient.simulateContract({
    address: `0x${contractAddress}`,
    abi,
    functionName: "addMyJsonCID",
    args: [cid, `0x${cidOwnerAddress}`],
    account,
    chain: scrollSepolia,
  });

  if (!request) {
    res
      .status(400)
      .send(`Failed to simulate contract operation for setMyJsonCID`);
    return;
  }

  await walletClient.writeContract(request);
}

async function addCIDToContractSetMyPdfCID(
  cid: string,
  cidOwnerAddress: string,
  res: Response
) {
  const { request } = await publicClient.simulateContract({
    address: `0x${contractAddress}`,
    abi,
    functionName: "addMyPdfCID",
    args: [cid, `0x${cidOwnerAddress}`],
    account,
    chain: scrollSepolia,
  });

  if (!request) {
    res
      .status(400)
      .send(`Failed to simulate contract operation for setMyPdfCID`);
    return;
  }

  await walletClient.writeContract(request);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
