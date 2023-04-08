export async function GET(request: Request) {
  const response = await fetch(process.env.AZURE_GET_CHATGPT_SUGESTION_URL!, {
    cache: 'no-store',
  })

  const textData = await response.text()

  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  })
}
