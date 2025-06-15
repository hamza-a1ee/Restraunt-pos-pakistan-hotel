import {
  forgotPassword,
  getMe,
  newPassword,
  signin,
  verifyOtp,
} from "@/services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserKeyFactory } from "./key-factory";
import { throwError } from "@/utils/react-query.util";
import { IUser } from "@/shared/interface/user/auth.interface";

export function useLogin() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin({ email, password }),
    mutationKey: [UserKeyFactory.login],
    onError: throwError("Login Error"),
  });

  return {
    login: mutate,
    isLoading: isPending,
  };
}

export function useMe() {
  const { data, isLoading } = useQuery<{ user: IUser }>({
    queryKey: [UserKeyFactory.me],
    queryFn: () => getMe(),
  });

  return {
    me: data,
    isLoading,
  };
}

export function useForgotPassword() {
  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    mutationKey: [UserKeyFactory.forgotPassword],
    onError: throwError("Forgot Password Error"),
  });

  return {
    forgotPassword: mutate,
    isLoading: isPending,
  };
}

export function useVerifyOtp() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyOtp(email, otp),
    mutationKey: [UserKeyFactory.verifyOtp],
    onError: throwError("Verify Otp"),
  });

  return {
    verifyOtp: mutate,
    isLoading: isPending,
  };
}

export function useNewPassword() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      email,
      password,
      otp,
    }: {
      email: string;
      password: string;
      otp: number;
    }) => newPassword(email, password, otp),
    mutationKey: [UserKeyFactory.newPassword],
    onError: throwError("New Password"),
  });

  return {
    newPassword: mutate,
    isLoading: isPending,
  };
}
