const API_URL = "https://graphql.datocms.com"
const API_TOKEN = process.env.DATOCMS_API_TOKEN

export async function datocmsRequest({
  query,
  variables,
  isPreview,
}: {
  query: string
  variables?
  isPreview?: boolean
}) {
  const res = await fetch(API_URL + (isPreview ? "/preview" : ""), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json.data
}
