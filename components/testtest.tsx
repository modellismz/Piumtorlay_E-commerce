import React, { useState } from "react"

interface Coupon {
  _createdAt: string
  _rev: string
  _type: string
  _id: string
  _updatedAt: string
  amount?: number
  percent?: number
  slug: {
    current: string
    _type: string
  }
  code: string
}

const App = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon | null>(null)
  const [isMatch, setIsMatch] = useState<boolean>(false)

  // Example database
  const database = [
    {
      _createdAt: "2024-01-26T10:08:12Z",
      _rev: "GDqWO6XlliaZ7kgo9TbUEH",
      _type: "coupon",
      _id: "ba894ea1-d1b4-4bbe-a130-18dd3c4d8916",
      _updatedAt: "2024-01-26T12:01:15Z",
      amount: 100,
      slug: { current: "playto100", _type: "slug" },
      code: "playto100",
    },
    {
      _createdAt: "2024-01-26T10:08:24Z",
      _rev: "GDqWO6XlliaZ7kgo9TbTuR",
      _type: "coupon",
      _id: "cca7237d-9f33-4048-8356-561334cb7a9d",
      _updatedAt: "2024-01-26T12:01:06Z",
      percent: 50,
      slug: { current: "play50", _type: "slug" },
      code: "play50",
    },
  ]

  const checkCoupon = (inputCoupon: Coupon) => {
    const match = database.some(
      (dbCoupon) =>
        dbCoupon.code === inputCoupon.code ||
        dbCoupon.slug.current === inputCoupon.slug.current
    )

    setIsMatch(match)
  }

  // This function would be triggered when a new coupon is submitted
  const handleNewCoupon = (inputCoupon: Coupon) => {
    setNewCoupon(inputCoupon)
    checkCoupon(inputCoupon)
  }

  return (
    <div>
      {/* Render UI elements here */}
      <p>New Coupon: {JSON.stringify(newCoupon)}</p>
      <p>Match Found: {isMatch ? "Yes" : "No"}</p>
    </div>
  )
}

export default App
