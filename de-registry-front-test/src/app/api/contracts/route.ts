export async function POST(request: Request) {
  const data = await request.json()

  try {
    const res = await fetch("https://gateway.ipfs.io/ipfs/" + data.pinataId)
    return Response.json({ code: await res.text() })
  } catch (err) {
    console.error(err)
  }
}
