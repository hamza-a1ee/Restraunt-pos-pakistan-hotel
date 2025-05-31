import { string, object } from "yup";

export const loginSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .min(3, "Atleast 3 characters are required")
    .required("Password is required"),
});
