import { object, string } from "yup";

export const addCategorySchema = object({
  name: string()
    .trim()
    .min(3, "Minimum 3 characters are required")
    .max(50, "Max 50 characters are allowed")
    .required("Category name is required"),
});
