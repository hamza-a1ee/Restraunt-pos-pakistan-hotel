import BackBtnLink from "@/components/button/back-button.component";
import PrimaryButton from "@/components/button/primary-button.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import FormWrapper from "@/components/wrappers/form-wrapper";
import { userRoutes } from "@/routes/user-routes";
import { forgotPasswordSchema } from "@/schema/forgot-password.schema";
import { TVoidCallback } from "@/shared/axios.shared.types";
import { useFormik } from "formik";

interface Props {
  onSubmit: (email: string, cb?: TVoidCallback) => void;
  isLoading: boolean;
}
export default function ForgotPassView({ onSubmit, isLoading }: Props) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      onSubmit(values.email, () => {
        formik.resetForm();
      });
    },
  });
  return (
    <>
      {" "}
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
        <PrimaryButton
          isLoading={isLoading}
          disabled={!formik.dirty || !formik.isValid || isLoading}
        >
          Submit
        </PrimaryButton>
      </FormWrapper>
    </>
  );
}
