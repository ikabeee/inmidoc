import { getUserReportModel } from "@/src/application/public/getUserReportModel";
import { UserReportView } from "@/src/presentation/public/UserReportView";

export default function UserReportPage() {
  const model = getUserReportModel();

  return <UserReportView categories={model.categories} procedures={model.procedures} />;
}
