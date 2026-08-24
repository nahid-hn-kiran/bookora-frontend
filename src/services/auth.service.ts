import { api } from "@/lib/axios";
import type {
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
} from "@/types/auth.types";

const loginUser = async (payload: ILoginPayload) => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};

const registerUser = async (payload: IRegisterPayload) => {
  console.log(payload);
  const response = await api.post("/auth/register", payload);

  return response.data;
};

const forgotPassword = async (payload: IForgotPasswordPayload) => {
  const response = await api.post("/auth/forget-password", payload);

  return response.data;
};

const resetPassword = async (payload: IResetPasswordPayload) => {
  const response = await api.post("/auth/reset-password", payload);

  return response.data;
};

export const authService = {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
};
