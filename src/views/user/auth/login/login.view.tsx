"use client";
import PrimaryButton from "@/components/button/primary-button.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import FormWrapper from "@/components/wrappers/form-wrapper";
import { userRoutes } from "@/routes/user-routes";
import { loginSchema } from "@/schema/login.schema";
import { useFormik } from "formik";
import Link from "next/link";
import { InferType } from "yup";

export default function LoginView() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values: InferType<typeof loginSchema>) => {
      console.log({ values });
    },
  });
  return (
    <>
      <h1 className="text-center text-[32px] font-bold leading-[40px]">
        Login
      </h1>

      <FormWrapper onSubmit={formik.handleSubmit}>
        <InputWithLabel
          label="Email"
          placeholder="Enter Email"
          onChange={(e) => {
            formik.setFieldTouched("email", true);
            formik.setFieldValue("email", e.target.value);
          }}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
        />
        <InputWithLabel
          type="password"
          label="Password"
          placeholder="Enter Password"
          onChange={(e) => {
            formik.setFieldTouched("password", true);
            formik.setFieldValue("password", e.target.value);
          }}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
        />
        <div className="w-full flex items-center justify-end">
          <Link href={userRoutes.forgotPassword()} className="hover:underline">
            Forgot Password?
          </Link>
        </div>
        <PrimaryButton>Login</PrimaryButton>
      </FormWrapper>
    </>
  );
}
