import { api } from "@/lib/axios";

import type {
  IAdmin,
  IUpdateAdminPayload,
  IUpdateUserPayload,
  IUser,
} from "@/types/admin.types";

export async function updateUser(userId: string, payload: IUpdateUserPayload) {
  const response = await api.patch<IUser>(`/admins/users/${userId}`, payload);

  return response.data;
}

export async function deleteUser(userId: string) {
  const response = await api.delete(`/admins/users/${userId}`);

  return response.data;
}

export async function updateAdmin(
  adminId: string,
  payload: IUpdateAdminPayload,
) {
  const response = await api.patch<IAdmin>(`/admins/${adminId}`, payload);

  return response.data;
}

export async function deleteAdmin(adminId: string) {
  const response = await api.delete(`/admins/${adminId}`);

  return response.data;
}
