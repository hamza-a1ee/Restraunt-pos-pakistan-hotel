import axiosInstance from "@/axios/axios.config";
import { ILogin } from "@/shared/interface/user/auth.interface";

export async function signin(payload: ILogin) {
  const response = await axiosInstance.post(`/api/auth/login`, payload);

  return response.data;
}

export async function forgotPassword(email: string) {
  const response = await axiosInstance.post("/api/otp/send-otp", null, {
    params: {
      email,
    },
  });

  return response.data;
}

export async function newPassword(
  email: string,
  password: string,
  otp: number
) {
  const response = await axiosInstance.patch(
    `/api/user/new-password/${email}`,
    { otp, password }
  );
  return response.data;
}

export async function verifyOtp(email: string, otp: string) {
  const response = await axiosInstance.post(
    `/api/otp/verify-otp`,
    {
      otp,
    },
    {
      params: { email },
    }
  );

  return response.data;
}
