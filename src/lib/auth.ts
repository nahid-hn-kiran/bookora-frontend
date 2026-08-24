import type { IUser } from "@/types/auth.types";
import { api } from "./server-fetch";

export async function getCurrentUser(): Promise<IUser | null> {
  try {
    return await api.get<IUser>("/auth/my-profile");
  } catch {
    return null;
  }
}
