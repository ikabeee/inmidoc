import { activityRows, dashboardMetrics } from "@/src/domain/mocks/inmidoc";

export function getAdminDashboardModel() {
  return {
    metrics: dashboardMetrics,
    activityRows,
  };
}
