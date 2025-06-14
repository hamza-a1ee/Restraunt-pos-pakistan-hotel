import PrimaryButton from "@/components/button/primary-button.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import FormWrapper from "@/components/wrappers/form-wrapper";
import { newPassSchema } from "@/schema/new-password.schema";
import { TOneParamCallback } from "@/shared/types/callbacks.types";
import { TForgotPassView } from "@/shared/types/forgot-password-view.types";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { InferType } from "yup";

interface Props {
  setView: TOneParamCallback<TForgotPassView>;
  isLoading: boolean;
  onSubmit: TOneParamCallback<string>;
}
export default function NewPassword({ isLoading, onSubmit, setView }: Props) {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: newPassSchema,
    onSubmit: (res: InferType<typeof newPassSchema>) => {
      onSubmit(res.password);
    },
  });
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <button type="button" onClick={() => setView("otp")}>
          <ArrowLeft className="hover:rounded-full hover:bg-placeholder p-1 w-8 h-8 duration-300" />
        </button>
      </div>

      <FormWrapper onSubmit={formik.handleSubmit}>
        <InputWithLabel
          label={"Password"}
          type="password"
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
        <InputWithLabel
          label={"Confirm Password"}
          placeholder="Enter Confirm Password"
          type="password"
          onChange={(e) => {
            formik.setFieldTouched("confirmPassword", true);
            formik.setFieldValue("confirmPassword", e.currentTarget.value);
          }}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
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
