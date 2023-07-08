import useWhoAmI from "@/app/hooks/useWhoAmI";
import { WhoAmIContext } from "./contexts/WhoAmIContext";
import { SortByProvider } from "./contexts/SortByContext";
import { ReadonlyProvider } from "./contexts/ReadonlyContext";
import { AdminProvider } from "./contexts/AdminContext";

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
