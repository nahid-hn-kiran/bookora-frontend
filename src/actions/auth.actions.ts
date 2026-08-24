/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { authService } from "@/services/auth.service";

import type {
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
} from "@/types/auth.types";

export async function loginAction(payload: ILoginPayload) {
  try {
    const result = await authService.loginUser(payload);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Unable to login. Please check your credentials.",
    };
  }
}

export async function registerAction(payload: IRegisterPayload) {
  console.log(payload);
  try {
    const result = await authService.registerUser(payload);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error: any) {
    console.log("error");
    return {
      success: false,
      message:
        error?.response?.data?.message || "Unable to create your account.",
    };
  }
}

export async function forgotPasswordAction(payload: IForgotPasswordPayload) {
  try {
    const result = await authService.forgotPassword(payload);

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Unable to process your request.",
    };
  }
}

export async function resetPasswordAction(payload: IResetPasswordPayload) {
  try {
    const result = await authService.resetPassword(payload);

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Unable to reset your password.",
    };
  }
}
