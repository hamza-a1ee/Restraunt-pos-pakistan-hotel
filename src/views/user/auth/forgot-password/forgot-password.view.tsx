"use client";

import { useForgotPassword, useVerifyOtp } from "@/queries/user.query";
import { toast } from "sonner";
import { useState } from "react";
import { TForgotPassView } from "@/shared/types/forgot-password-view.types";
import ForgotPassView from "./forgot-pass";
import { TVoidCallback } from "@/shared/axios.shared.types";
import OtpView from "./otp";
import { useRouter } from "next/navigation";
import { userRoutes } from "@/routes/user-routes";

export default function ForgotPasswordView() {
  const router = useRouter();
  const [view, setView] = useState<TForgotPassView>("forgot-password");
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { forgotPassword, isLoading } = useForgotPassword();

  const { isLoading: verifyOtpLoading, verifyOtp } = useVerifyOtp();

  const handleSendOtp = (cb?: TVoidCallback) => {
    forgotPassword(email, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setView("otp");
        cb?.();
      },
    });
  };

  const handleVerifyOtp = () => {
    verifyOtp(
      { email, otp },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          router.push(userRoutes.login());
        },
      }
    );
  };

  return (
    <>
      {view === "forgot-password" && (
        <>
          <ForgotPassView
            isLoading={isLoading}
            onSubmit={(e: string, cb?: TVoidCallback) => {
              setEmail(e);
              handleSendOtp(cb);
            }}
          />
        </>
      )}

      {view === "otp" && (
        <>
          <OtpView
            setView={setView}
            isLoading={verifyOtpLoading}
            otp={otp}
            setOtp={setOtp}
            handleResendOtp={handleSendOtp}
            onSubmit={handleVerifyOtp}
          />
        </>
      )}
    </>
  );
}
