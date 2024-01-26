import { defineField, defineType } from "sanity"

export const onTop = defineType({
  name: "onTop",
  title: "On Top Discount",
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
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "percent",
      title: "Discount Percent",
      type: "number",
    }),
  ],
})
