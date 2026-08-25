import { api } from "@/lib/server-fetch";

import type {
  IGetUsersQuery,
  IUpdateUserPayload,
  IUser,
} from "@/types/admin.types";

export async function getAllUsers(query?: IGetUsersQuery) {
  const params = new URLSearchParams();

  if (query?.page) {
    params.set("page", String(query.page));
  }

  if (query?.limit) {
    params.set("limit", String(query.limit));
  }

  if (query?.search) {
    params.set("search", query.search);
  }

  if (query?.status) {
    params.set("status", query.status);
  }

  const queryString = params.toString();

  return api.get<IUser[]>(
    `/admins/users${queryString ? `?${queryString}` : ""}`,
  );
}

export async function getUserById(userId: string) {
  return api.get<IUser>(`/admins/users/${userId}`);
}

export async function updateUser(userId: string, payload: IUpdateUserPayload) {
  return api.patch<IUser>(`/admins/users/${userId}`, payload);
}

export async function deleteUser(userId: string) {
  return api.delete(`/admins/users/${userId}`);
}
