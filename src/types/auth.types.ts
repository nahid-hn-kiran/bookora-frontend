export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  token: string;
  newPassword: string;
}

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export type UserStatus = "BLOCKED" | "DELETED" | "ACTIVE";

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
