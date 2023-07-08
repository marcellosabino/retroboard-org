import { createContext, useContext, useReducer } from "react";

const SortBy = {
  Chronological: {
    name: "chronological",
    sortBy: (a: any, b: any) => a.createdAt.localeCompare(b.createdAt),
  },
  Votes: {
    name: "votes",
    sortBy: (a: any, b: any) => b.votes.length - a.votes.length,
  },
};

const SortByContext = createContext({
  name: "chronological",
  sortBy: SortBy.Chronological,
});
const SortByDispatchContext = createContext<any>(null);

export function SortByProvider({ children }: any) {
  const [sortBy, dispatch] = useReducer(sortByReducer, initialSortBy);

  return (
    <SortByContext.Provider value={sortBy}>
      <SortByDispatchContext.Provider value={dispatch}>
        {children}
      </SortByDispatchContext.Provider>
    </SortByContext.Provider>
  );
}

function sortByReducer(_sortBy: any, action: any): any {
  switch (action.type) {
    case "votes":
      return SortBy.Votes;
    default:
      return SortBy.Chronological;
  }
}

export function useSortBy() {
  return useContext(SortByContext);
}

export function useSortByDispatch() {
  return useContext(SortByDispatchContext);
}

const initialSortBy = SortBy.Chronological;
