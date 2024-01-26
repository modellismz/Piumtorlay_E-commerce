import sanityClient from "@sanity/client"

// Configure your Sanity client
const client = sanityClient({
  projectId: "ih8x2bic",
  dataset: "production",
  useCdn: false,
})

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { couponCode } = req.body

    try {
      // Query Sanity for the coupon
      const query = `*[ _type == "coupon" && code == $couponCode ][0]`
      const coupon = await client.fetch(query, { couponCode })

      if (coupon) {
        // Coupon is valid
        res.status(200).json({ isValid: true, discount: coupon })
      } else {
        // Coupon is invalid
        res.status(200).json({ isValid: false })
      }
    } catch (error) {
      res.status(500).json({ message: "Error validating coupon" })
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
