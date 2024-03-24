interface PinataRel {
  cidOwnerAddress: string
  jsonCID?: string
  pdfCID?: string
}

export async function POST(request: Request) {
  const { cidOwnerAddress, jsonCID, pdfCID } = await request.json()

  let data: PinataRel = { cidOwnerAddress }
  if (jsonCID) data.jsonCID = jsonCID
  if (pdfCID) data.pdfCID = pdfCID

  console.log(data)

  try {
    const res = await fetch(
      "https://getcontractdataapi.fly.dev/AddCIDToContract",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    const text = await res.text()
    return Response.json({ message: text })
  } catch (err) {
    console.error(err)
  }
}
