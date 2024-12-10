import { z } from "zod";

const StationeryProductSchemazod = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Product name must be at least 2 characters long" })
    .refine((value) => value.trim().length > 0, { message: "Product name is required" }),
    password:z.string().trim(),
  brand: z
    .string()
    .trim()
    .refine((value) => value.trim().length > 0, { message: "Brand is required" }),
  price: z
    .number()
    .min(10, { message: "Price must be a positive number Error by zod" }),
  category: z.enum(
    ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    { message: "Invalid category" }
  ),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .refine((value) => value.trim().length > 0, { message: "Description is required" }),
  quantity: z
    .number()
    .min(0, { message: "Quantity must be a positive number" }),
  inStock: z.boolean().optional().default(true),
});

export default StationeryProductSchemazod ;
