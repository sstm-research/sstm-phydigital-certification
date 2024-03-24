import pinata from "@/app/lib/pinata-client"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const res = await pinata.pinJSONToIPFS(data, {
      pinataMetadata: { name: "json" },
    })

    return Response.json(res)
  } catch (err) {
    console.error(err)
  }
}
