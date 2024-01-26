import { defineField, defineType } from "sanity"

export const coupon = defineType({
  name: "coupon",
  title: "Coupon Discount",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Coupon Code",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "code",
      },
    }),
    defineField({
      name: "amount",
      title: "Discount Amount (THB)",
      type: "number",
    }),
    defineField({
      name: "percent",
      title: "Discount Percent",
      type: "number",
    }),
  ],
})
