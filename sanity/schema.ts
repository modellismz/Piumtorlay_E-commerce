import { coupon } from "@/sanity/schemas/coupon"
import { onTop } from "@/sanity/schemas/ontop"
import { product } from "@/sanity/schemas/product-schema"
import { seasonal } from "@/sanity/schemas/seasonal"
import { type SchemaTypeDefinition } from "sanity"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, coupon, onTop, seasonal],
}
