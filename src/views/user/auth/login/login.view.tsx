"use client";
import PrimaryButton from "@/components/button/primary-button.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import FormWrapper from "@/components/wrappers/form-wrapper";
import { useLogin } from "@/queries/user.query";
import { userRoutes } from "@/routes/user-routes";
import { loginSchema } from "@/schema/login.schema";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InferType } from "yup";

export default function LoginView() {
  const router = useRouter();
  const { isLoading, login } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values: InferType<typeof loginSchema>) => {
      login(
        { email: values.email, password: values.password },
        {
          onSuccess: (res) => {
            toast.success(res?.message, { duration: 5000 });
            if (res?.data?.token) {
              setCookie("accessToken", res.data.token, {
                maxAge: 60 * 60 * 24,
              });
            }
            router.push(userRoutes.dashboard());
          },
        }
      );
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
        <PrimaryButton
          isLoading={isLoading}
          type="submit"
          disabled={!formik.isValid || isLoading}
        >
          Login
        </PrimaryButton>
      </FormWrapper>
    </>
  );
}
