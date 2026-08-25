import { Badge } from "@/components/ui/badge";

import type { UserStatus } from "@/types/auth.types";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  switch (status) {
    case "ACTIVE":
      return <Badge variant="default">Active</Badge>;

    case "BLOCKED":
      return <Badge variant="destructive">Blocked</Badge>;

    case "DELETED":
      return <Badge variant="destructive">Deleted</Badge>;

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
