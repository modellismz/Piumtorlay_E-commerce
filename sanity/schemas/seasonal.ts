import { defineField, defineType } from "sanity"

export const seasonal = defineType({
  name: "seasonal",
  title: "Seasonal Discount",
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
      name: "threshold",
      title: "Every X THB",
      type: "number",
    }),
    defineField({
      name: "discountAmount",
      title: "Subtract Y THB",
      type: "number",
    }),
  ],
})
