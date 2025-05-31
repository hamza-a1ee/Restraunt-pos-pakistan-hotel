import { object, string } from "yup";

export const forgotPasswordSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
});
