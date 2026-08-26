import { api } from "@/lib/server-fetch";

import type { IAdmin, IGetUsersQuery, IUser } from "@/types/admin.types";

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
  const result = api.get<IUser>(`/admins/users/${userId}`);
  console.log(result);

  return result;
}

export async function getAllAdmins() {
  return api.get<IAdmin[]>("/admins");
}

export async function getAdminById(adminId: string) {
  return api.get<IAdmin>(`/admins/${adminId}`);
}
