import { getSearchPageModel } from "@/src/application/public/getSearchPageModel";
import { ProcedureCatalog } from "@/src/presentation/public/ProcedureCatalog";
import { SearchHero } from "@/src/presentation/public/SearchHero";

export default function HomePage() {
  const model = getSearchPageModel();

  return (
    <>
      <SearchHero frequentSearches={model.frequentSearches} />
      <ProcedureCatalog filters={model.filters} procedures={model.procedures} />
    </>
  );
}
