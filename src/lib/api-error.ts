import axios from "axios";

interface IApiErrorResponse {
  success: boolean;
  message: string;
  errorSource?: {
    path: string;
    message: string;
  }[];
  error?: {
    statusCode: number;
  };
}

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) => {
  if (axios.isAxiosError<IApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.errorSource?.[0]?.message ||
      fallback
    );
  }

  return fallback;
};
