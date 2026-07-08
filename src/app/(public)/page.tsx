import { getSearchPageModel } from "@/src/application/public/getSearchPageModel";
import { ProcedureCatalog } from "@/src/presentation/public/ProcedureCatalog";

export default async function HomePage() {
  const model = await getSearchPageModel();

  return <ProcedureCatalog filters={model.filters} procedures={model.procedures} frequentSearches={model.frequentSearches} />;
}
