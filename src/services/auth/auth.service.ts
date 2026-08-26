import { api } from "@/lib/axios";

import type {
  IChangePasswordPayload,
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

export async function changePassword(payload: IChangePasswordPayload) {
  const response = await api.post("/auth/change-password", payload);

  return response.data;
}
