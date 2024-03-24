export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    data.append("file", file)
    data.append("pinataMetadata", JSON.stringify({ name: "pdf" }))

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    })

    const json = await res.json()
    return Response.json(json)
  } catch (err) {
    console.error(err)
  }
}
