import type { UserRole, UserStatus } from "./auth.types";

export interface IMyProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;

  admin?: {
    id: string;
    contactNumber: string | null;
    profilePhoto: string | null;
  } | null;
}

export interface IUpdateMyProfilePayload {
  name?: string;
  image?: string;
  contactNumber?: string;
}
