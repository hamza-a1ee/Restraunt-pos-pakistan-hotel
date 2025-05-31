import { object, string } from "yup";

export const customerSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  firstName: string()
    .trim()
    .min(3, "Atleast 3 characters are required")
    .max(50, "Max 50 characters are allowed")
    .required("First Name is required"),
  lastName: string()
    .trim()
    .min(3, "Atleast 3 characters are required")
    .max(50, "Max 50 characters are allowed")
    .required("Last name is required"),
  address: string()
    .trim()
    .min(3, "Atleast 3 characters are required")
    .max(50, "Max 50 characters are allowed")
    .required("Address is required"),
  contact: string()
    .trim()
    .matches(
      /^\d{11}$/,
      "Phone number must be exactly 11 digits and only numbers"
    )
    .required("Contact is required"),
  gender: string().required("Gender is required"),
});
