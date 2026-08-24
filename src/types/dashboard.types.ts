export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface IDashboardNavItem {
  title: string;
  href: string;
  icon:
    | "layout-dashboard"
    | "building-2"
    | "door-open"
    | "clock-3"
    | "calendar-days"
    | "users"
    | "shield-check";
  roles?: UserRole[];
}

export interface IDashboardUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
