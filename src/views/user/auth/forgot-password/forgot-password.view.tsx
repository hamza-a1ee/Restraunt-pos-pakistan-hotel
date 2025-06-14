"use client";

import {
  useForgotPassword,
  useNewPassword,
  useVerifyOtp,
} from "@/queries/user.query";
import { toast } from "sonner";
import { useState } from "react";
import { TForgotPassView } from "@/shared/types/forgot-password-view.types";
import ForgotPassView from "./forgot-pass";
import { TVoidCallback } from "@/shared/axios.shared.types";
import OtpView from "./otp";
import { useRouter } from "next/navigation";
import { userRoutes } from "@/routes/user-routes";
import NewPassword from "./new-password";

export default function ForgotPasswordView() {
  const router = useRouter();

  // ======================STATES==============================
  const [view, setView] = useState<TForgotPassView>("forgot-password");
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // ================REACT QUERY HOOKS=================
  const { forgotPassword, isLoading } = useForgotPassword();

  const { isLoading: newPasswordLoading, newPassword } = useNewPassword();

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
  // ===================HANDLES====================

  const handleVerifyOtp = () => {
    verifyOtp(
      { email, otp },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          setView("new-password");
        },
      }
    );
  };

  const handleNewPassword = (password: string) => {
    newPassword(
      { email, otp: Number(otp), password },
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
        <ForgotPassView
          isLoading={isLoading}
          onSubmit={(e: string, cb?: TVoidCallback) => {
            setEmail(e);
            handleSendOtp(cb);
          }}
        />
      )}

      {view === "otp" && (
        <OtpView
          setView={setView}
          isLoading={verifyOtpLoading}
          otp={otp}
          setOtp={setOtp}
          handleResendOtp={handleSendOtp}
          onSubmit={handleVerifyOtp}
        />
      )}

      {view === "new-password" && (
        <NewPassword
          isLoading={newPasswordLoading}
          onSubmit={handleNewPassword}
          setView={setView}
        />
      )}
    </>
  );
}
