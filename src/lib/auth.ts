import { serverApi } from "@/lib/server-api";
import type { IUser } from "@/types/auth.types";

export async function getCurrentUser(): Promise<IUser | null> {
  try {
    return await serverApi<IUser>("/auth/my-profile");
  } catch {
    return null;
  }
}
