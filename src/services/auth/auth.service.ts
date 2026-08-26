import { api } from "@/lib/axios";

import type {
  IMyProfile,
  IUpdateMyProfilePayload,
} from "@/types/profile.types";

export async function updateMyProfile(payload: IUpdateMyProfilePayload) {
  const response = await api.patch<IMyProfile>(
    "/auth/update-my-profile",
    payload,
  );

  return response.data;
}
