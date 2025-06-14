import { object, string, ref } from "yup";

export const newPassSchema = object({
  password: string()
    .trim() // trims leading/trailing spaces
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),

  confirmPassword: string()
    .trim()
    .required("Confirm Password is required")
    .oneOf([ref("password")], "Passwords must match"),
});
