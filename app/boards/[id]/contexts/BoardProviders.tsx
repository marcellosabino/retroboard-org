import useWhoAmI from "@/app/hooks/useWhoAmI";
import { WhoAmIContext } from "./WhoAmIContext";
import { SortByProvider } from "./SortByContext";
import { ReadonlyProvider } from "./ReadonlyContext";
import { AdminProvider } from "./AdminContext";

export default function BoardProviders({ children, isBoardOwner }: any) {
  const whoAmI = useWhoAmI();

  return (
    <WhoAmIContext.Provider value={whoAmI}>
      <AdminProvider isBoardOwner={isBoardOwner}>
        <SortByProvider>
          <ReadonlyProvider>{children}</ReadonlyProvider>
        </SortByProvider>
      </AdminProvider>
    </WhoAmIContext.Provider>
  );
}
