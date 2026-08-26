import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

import type {
  IAuthResponse,
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
} from "@/types/auth.types";

const loginUser = async (payload: ILoginPayload) => {
  const response = await api.post<ApiResponse<IAuthResponse>>(
    "/auth/login",
    payload,
  );

  return response.data;
};

const registerUser = async (payload: IRegisterPayload) => {
  const response = await api.post<ApiResponse<IAuthResponse>>(
    "/auth/register",
    payload,
  );

  return response.data;
};

const forgotPassword = async (payload: IForgotPasswordPayload) => {
  const response = await api.post<ApiResponse<unknown>>(
    "/auth/forget-password",
    payload,
  );

  return response.data;
};

const resetPassword = async (payload: IResetPasswordPayload) => {
  const response = await api.post<ApiResponse<unknown>>(
    "/auth/reset-password",
    payload,
  );

  return response.data;
};

export const authService = {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
};
