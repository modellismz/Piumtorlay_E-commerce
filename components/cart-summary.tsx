"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { client } from "@/config/configSanity"
// Import your configured Sanity client
import { Button } from "@/components/ui/button"

export function CartSummary() {
  const { formattedTotalPrice, totalPrice, cartDetails, cartCount } =
    useShoppingCart()

  const [couponCode, setCouponCode] = useState("")
  const [discountAmount, setDiscountAmount] = useState(0)
  const [finalTotal, setFinalTotal] = useState(totalPrice || 0) // Add this line

  useEffect(() => {
    // Update finalTotal whenever totalPrice or discountAmount changes
    if (typeof totalPrice !== "undefined") {
      const newTotal = totalPrice - discountAmount
      setFinalTotal(newTotal > 0 ? newTotal : 0) // Prevent negative values
    }
  }, [discountAmount, totalPrice])

  const handleApplyCoupon = async () => {
    console.log("Attempting to apply coupon:", couponCode) // Debug log
    try {
      const coupon = await client.fetch(
        `*[_type == "coupon" && slug.current == $couponCode][0]`,
        { couponCode }
      )

      console.log("Fetched coupon:", coupon) // Debug log

      if (!coupon) {
        alert("Invalid coupon code.")
        return
      }

      let discount = 0
      if (coupon.percent) {
        discount = totalPrice ? (totalPrice * coupon.percent) / 100 : 0
      } else if (coupon.amount) {
        discount = coupon.amount
      }

      setDiscountAmount(discount)
    } catch (error) {
      console.error("Error applying coupon:", error)
      alert("Error applying coupon.")
    }
  }

  const shippingAmount = cartCount! > 0 ? 500 : 0

  function onCheckout() {}

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{formattedTotalPrice}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">
            {formatCurrencyString({ value: shippingAmount, currency: "THB" })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {formatCurrencyString({
              value: finalTotal + shippingAmount,
              currency: "THB",
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full border-2 border-gray-300 p-2"
        />
        <button
          onClick={handleApplyCoupon}
          className="mt-2 w-full bg-blue-500 p-2 text-white"
        >
          Apply Coupon
        </button>
      </div>

      <div className="mt-6">
        <Button className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Check Out
        </Button>
      </div>
    </section>
  )
}
