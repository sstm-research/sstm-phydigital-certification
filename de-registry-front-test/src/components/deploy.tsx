"use client"

import { ConnectWallet, useWallet } from "@thirdweb-dev/react"
import { useState } from "react"
import Button from "./button"

const PINATA_CONTRACT_ID = "QmfAvVLUUcsdDp25ZWkivxTGjyFDBtaXfcunhMe27AWxgY"

function Deploy() {
  const [code, setCode] = useState("")
  const [result, setResult] = useState<any>()
  const [deploying, setDeploying] = useState<boolean>(false)
  const [contractAddress, setContractAddress] = useState<string>("")
  const [pinataJsonAddress, setPinataJsonAddress] = useState<string>("")
  const [pinataPdfAddress, setPinataPdfAddress] = useState<string>("")
  const [contractData, setContractData] = useState<any>()
  const userWallet = useWallet()

  async function fetchContractData() {
    const userWalletAddress = await userWallet?.getAddress()
    if (!userWalletAddress) return

    const data = await fetch("/api/contracts/retrieve", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ cidOwnerAddress: userWalletAddress.substring(2) }),
    })
    const json = JSON.parse(await data.json())
    setContractData(json)
  }

  async function fetchSampleContract() {
    const data = { pinataId: PINATA_CONTRACT_ID }

    const response = await fetch("/api/contracts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    //
    const json = await response.json()
    setCode(json.code)
  }

  async function saveOnPinata(formData: FormData) {
    const data = {
      supplyAgent: {
        cnpj: formData.get("supplyAgent.cnpj"),
        name: formData.get("supplyAgent.name"),
        email: formData.get("supplyAgent.email"),
        inscricaoEstadual: formData.get("supplyAgent.inscricaoEstadual"),
        inscricaoMunicipal: formData.get("supplyAgent.inscricaoMunicipal"),
        address: {
          cep: formData.get("supplyAgent.address.cep"),
          street: formData.get("supplyAgent.address.street"),
          city: formData.get("supplyAgent.address.city"),
          state: formData.get("supplyAgent.address.state"),
          complement: formData.get("supplyAgent.address.complement"),
        },
      },
      supplyArea: {
        name: formData.get("supplyArea.name"),
      },
      duration: formData.get("duration"),
      since: formData.get("since"),
      unitsMeasure: formData.get("unitsMeasure"),
      contractAddress: formData.get("contractAddress"),
    }

    const response = await fetch("/api/pinata", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const json = await response.json()
    setPinataJsonAddress(json.IpfsHash)
    console.log(json)
  }

  async function saveOnScroll() {
    const userWalletAddress = await userWallet?.getAddress()
    if (!userWalletAddress) return

    const relData = {
      cidOwnerAddress: userWalletAddress.substring(2),
      pdfCID: pinataPdfAddress,
      jsonCID: pinataJsonAddress,
    }
    const relResponse = await fetch("/api/contracts/rel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(relData),
    })
    console.log(await relResponse.json())

    await fetchContractData()
  }

  async function handleSignFile(formData: FormData) {
    const fileToUpload = formData.get("signFile")
    if (!fileToUpload) return

    const data = new FormData()
    data.set("file", fileToUpload)

    const response = await fetch("/api/pinata/uploadDoc", {
      method: "POST",
      body: data,
    })

    const result = await response.json()
    console.log(result)

    setPinataPdfAddress(result.IpfsHash)

    const relData = {
      cidOwnerAddress: "6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d",
      pdfCID: result.IpfsHash,
    }
    const relResponse = await fetch("/api/contracts/rel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(relData),
    })
  }

  async function deployCode() {
    setDeploying(true)
    const resDeploy = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ solidityCode: code }),
    })

    const json = await resDeploy.json()

    setResult(JSON.stringify(json, null, 2))
    setContractAddress(json.contractAddress)
    setDeploying(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold">Test API</h1>
      <ConnectWallet
        switchToActiveChain={true}
        modalSize={"compact"}
        showThirdwebBranding={false}
      />
      {userWallet ? (
        <>
          <div className="flex flex-col gap-1">
            <p>Verify your contract</p>
            <Button onClick={fetchSampleContract}>
              Fetch Example Contract from IPFS
            </Button>
            <textarea
              className="min-h-64 bg-slate-200 rounded-lg p-4"
              readOnly
              value={code}
            />
            {code === "" ? null : (
              <a
                href={`https://gateway.ipfs.io/ipfs/${PINATA_CONTRACT_ID}`}
                target="_blank"
                className="text-xs"
              >
                See contract on IPFS
              </a>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p>See the contract response</p>
            <Button disabled={code === ""} className="" onClick={deployCode}>
              {deploying ? "Deploying..." : "Deploy on Otavio API"}
            </Button>
            <textarea
              readOnly
              value={result}
              className="min-h-64 bg-slate-200 rounded-lg p-4"
            />
            {contractAddress === "" ? null : (
              <a
                className="text-xs"
                href={`https://sepolia.scrollscan.dev/address/${contractAddress}`}
                target="_blank"
              >
                See contract on Scrollscan
              </a>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p>Save the data on Pinata</p>
            <form className="flex flex-col gap-2" action={saveOnPinata}>
              <input
                // required
                className="bg-slate-200 rounded-lg p-2"
                type="text"
                value={contractAddress}
                placeholder="contract address"
                name="contractAddress"
                readOnly
              />
              <div className="flex flex-col gap-1">
                <p className="text-xs">Supply Agent</p>
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="name"
                  name="supplyAgent.name"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="email"
                  placeholder="email"
                  name="supplyAgent.email"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="cnpj"
                  name="supplyAgent.cnpj"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="number"
                  placeholder="Inscrição Estadual"
                  name="supplyAgent.inscricaoEstadual"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="number"
                  placeholder="Inscrição Municipal"
                  name="supplyAgent.inscricaoMunicipal"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs">Supply Area</p>
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="name"
                  name="supplyArea.name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs">Physical Address</p>
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="cep"
                  name="supplyAgent.address.cep"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="street"
                  name="supplyAgent.address.street"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="city"
                  name="supplyAgent.address.city"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="state"
                  name="supplyAgent.address.state"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="complement"
                  name="supplyAgent.address.complement"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs">Contract Data</p>
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="number"
                  placeholder="duration"
                  name="duration"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="number"
                  placeholder="since"
                  name="since"
                />
                <input
                  // required
                  disabled={contractAddress === ""}
                  className="bg-slate-200 rounded-lg p-2"
                  type="text"
                  placeholder="unitsMeasure"
                  name="unitsMeasure"
                />
              </div>

              <Button
                disabled={contractAddress === "" || pinataJsonAddress !== ""}
                type="submit"
              >
                Save on Pinata
              </Button>
            </form>
            <Button
              disabled={pinataJsonAddress === ""}
              onClick={() =>
                window.open(
                  "https://gateway.ipfs.io/ipfs/" + pinataJsonAddress,
                  "_blank",
                  "noopener"
                )
              }
            >
              Show on Pinata
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <p>Sign your document with the off-chain version</p>
            <form action={handleSignFile} className="flex flex-col gap-1">
              <input
                // required
                type="file"
                name="signFile"
                className="bg-slate-200 rounded-lg p-2"
                accept="application/pdf"
              />
              <Button type="submit">Save on Pinata</Button>
            </form>
            <Button
              disabled={pinataPdfAddress === ""}
              onClick={() => {
                window.open(
                  "https://gateway.ipfs.io/ipfs/" + pinataPdfAddress,
                  "_blank",
                  "noopener"
                )
              }}
            >
              View on Pinata
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <p>Save the IPFS data on Scroll</p>
            <Button
              onClick={saveOnScroll}
              disabled={pinataPdfAddress === "" || pinataJsonAddress === ""}
            >
              Save data on Scroll
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <textarea
              className="text-sm min-h-64 bg-slate-200 rounded-lg p-4"
              name="contractCode"
              readOnly
              value={JSON.stringify(contractData, null, 2)}
            />
            <Button onClick={fetchContractData}>Fetch data for user</Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Deploy
