import { object, string } from "yup";

export const addDishSchema = object({
  name: string()
    .trim()
    .min(3, "Minimum 3 characters are required")
    .max(50, "Max 50 characters are allowed")
    .required("Dish name is required"),

  category: string().required("Category is required"),
});
