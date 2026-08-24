import { api } from "@/lib/axios";

import type {
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
  IUser,
} from "@/types/auth.types";

const loginUser = async (payload: ILoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

const registerUser = async (payload: IRegisterPayload) => {
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

interface MyProfileResponse {
  success: boolean;
  message: string;
  data: IUser;
}

// export async function getCurrentUser(): Promise<IUser | null> {
//   try {
//     const response = await serverFetch<MyProfileResponse>("/auth/my-profile");

//     return response.data;
//   } catch {
//     return null;
//   }
// }

export const authService = {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
};
