import { ApiResponse } from "@/types/api.types";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  let url = `${API_BASE_URL}${endpoint}`;

  if (options.params) {
    const searchParams = new URLSearchParams();

    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();

    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const { params: _params, headers: customHeaders, ...fetchOptions } = options;

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...customHeaders,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong while fetching data.",
    );
  }

  return result as ApiResponse<T>;
}

const get = async <T>(endpoint: string, options?: RequestOptions) => {
  return request<T>(endpoint, {
    ...options,
    method: "GET",
  });
};

const post = async <T>(
  endpoint: string,
  body?: unknown,
  options?: RequestOptions,
) => {
  return request<T>(endpoint, {
    ...options,
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
};

const put = async <T>(
  endpoint: string,
  body?: unknown,
  options?: RequestOptions,
) => {
  return request<T>(endpoint, {
    ...options,
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  });
};

const patch = async <T>(
  endpoint: string,
  body?: unknown,
  options?: RequestOptions,
) => {
  return request<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: body ? JSON.stringify(body) : undefined,
  });
};

const del = async <T>(endpoint: string, options?: RequestOptions) => {
  return request<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
};

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
};
