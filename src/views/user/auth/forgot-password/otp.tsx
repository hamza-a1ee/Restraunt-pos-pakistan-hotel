import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TForgotPassView } from "@/shared/types/forgot-password-view.types";
import { ArrowLeft } from "lucide-react";
import PrimaryButton from "@/components/button/primary-button.component";
import { TOneParamCallback } from "@/shared/types/callbacks.types";
import OtpTimer from "@/components/otp-timer.component";
import { useState } from "react";
import { TVoidCallback } from "@/shared/axios.shared.types";
import { Button } from "@/components/ui/button";

interface Props {
  setView: TOneParamCallback<TForgotPassView>;
  isLoading: boolean;
  setOtp: TOneParamCallback<string>;
  otp: string;
  handleResendOtp: TVoidCallback;
  onSubmit: TVoidCallback;
}
export default function OtpView({
  setView,
  isLoading = false,
  setOtp,
  handleResendOtp,
  onSubmit,
  otp,
}: Props) {
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleResend = () => {
    setDisabled(true);
    handleResendOtp();
  };
  return (
    <>
      {" "}
      <div className="w-full flex justify-between items-center">
        <button type="button" onClick={() => setView("forgot-password")}>
          <ArrowLeft className="hover:rounded-full hover:bg-placeholder p-1 w-8 h-8 duration-300" />
        </button>
      </div>
      <InputOTP maxLength={4} onChange={(e) => setOtp(e)} value={otp}>
        <InputOTPGroup className=" flex gap-x-3 w-full items-center justify-center">
          <InputOTPSlot index={0} className="rounded-lg h-11 w-11" />
          <InputOTPSlot index={1} className="rounded-lg h-11 w-11" />
          <InputOTPSlot index={2} className="rounded-lg h-11 w-11" />
          <InputOTPSlot index={3} className="rounded-lg h-11 w-11" />
        </InputOTPGroup>
      </InputOTP>
      {disabled ? (
        <OtpTimer duration={30} onTimerEnd={() => setDisabled(false)} />
      ) : (
        <Button
          onClick={handleResend}
          disabled={disabled}
          type="button"
          className=" shadow-none p-0 h-fit border-none text-white cursor-pointer hover:underline"
        >
          Resend Code
        </Button>
      )}
      <PrimaryButton
        isLoading={isLoading}
        disabled={isLoading || otp.length === 0}
        onClick={onSubmit}
      >
        Submit
      </PrimaryButton>
    </>
  );
}
