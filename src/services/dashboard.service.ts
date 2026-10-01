import { api } from "@/lib/server-fetch";

import type { IDashboardStats } from "@/types/dashboard.types";

const getDashboardStats = async () => {
  return api.get<IDashboardStats>("/admin/dashboard/stats");
};

export const dashboardService = {
  getDashboardStats,
};
