import type { UserStatus, UserRole } from "./auth.types";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  status: UserStatus;
  role: UserRole;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
}

export interface IUpdateUserPayload {
  name?: string;
  profilePhoto?: string;
  status?: UserStatus;
}
