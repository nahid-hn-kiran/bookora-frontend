import type { IUser } from "@/types/auth.types";
import { api } from "./server-fetch";

export async function getCurrentUser(): Promise<IUser | null> {
  try {
    const response = await api.get<IUser>("/auth/my-profile");

    return response.data;
  } catch {
    return null;
  }
}
