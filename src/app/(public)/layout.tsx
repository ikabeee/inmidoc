import type { ReactNode } from "react";

import { UserLayout } from "@/src/presentation/layouts/UserLayout";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <UserLayout>{children}</UserLayout>;
}
