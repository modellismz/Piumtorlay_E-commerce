import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "ih8x2bic",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
})

export default client
