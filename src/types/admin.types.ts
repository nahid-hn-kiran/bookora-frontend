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

export interface IUpdateUserPayload {
  name?: string;
  profilePhoto?: string;
  status?: UserStatus;
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

export interface IAdmin {
  id: string;
  contactNumber: string | null;
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
    photo: string | null;
    role: UserRole;
    status: UserStatus;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUpdateAdminPayload {
  admin?: {
    name?: string;
    profilePhoto?: string;
    contactNumber?: string;
  };
}
