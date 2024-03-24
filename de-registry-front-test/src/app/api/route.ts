export async function POST(request: Request) {
  const data = await request.json()

  const resDeploy = await fetch(
    "https://deploycontractapi.fly.dev/compileAndDeploy",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ solidityCode: data.solidityCode }),
    }
  )

  return Response.json(await resDeploy.json())
}
