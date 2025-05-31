"use client";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import FormWrapper from "@/components/wrappers/form-wrapper";
import { userRoutes } from "@/routes/user-routes";
import PrimaryButton from "@/components/button/primary-button.component";
import BackBtnLink from "@/components/button/back-button.component";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/schema/forgot-password.schema";

export default function ForgotPasswordView() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <BackBtnLink backLink={userRoutes.login()} />
        <h1 className="text-[32px] w-full flex items-center justify-center ">
          Forgot Password
        </h1>
      </div>
      <FormWrapper onSubmit={formik.handleSubmit}>
        <InputWithLabel
          label={"Email"}
          placeholder="Enter Email"
          onChange={(e) => {
            formik.setFieldValue("email", e.target.value);
            formik.setFieldTouched("email", true);
          }}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
        />
        <PrimaryButton disabled={!formik.dirty || !formik.isValid}>
          Submit
        </PrimaryButton>
      </FormWrapper>
    </>
  );
}
