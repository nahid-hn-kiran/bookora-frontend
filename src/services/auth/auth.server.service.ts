import { api } from "@/lib/server-fetch";

import type { IMyProfile } from "@/types/profile.types";

export async function getMyProfile() {
  return api.get<IMyProfile>("/auth/my-profile");
}
