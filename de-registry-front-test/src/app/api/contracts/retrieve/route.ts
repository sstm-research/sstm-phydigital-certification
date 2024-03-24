export async function POST(request: Request) {
  const userJson = await request.json()
  console.log(userJson.cidOwnerAddress)

  const res = await fetch(
    `https://getcontractdataapi.fly.dev/CIDsFromContractByUserAddress?cidOwnerAddress=${userJson.cidOwnerAddress}`
  )

  const resJson = await res.text()
  return Response.json(resJson)
}
