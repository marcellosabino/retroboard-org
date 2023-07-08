import { Dispatch, createContext, useContext, useReducer } from "react";

const ReadonlyContext = createContext(false);
const ReadonlyDispatchContext = createContext<Dispatch<boolean>>(() => {});

export function ReadonlyProvider({ children }: any) {
  const [isReadonly, dispatch] = useReducer(readonlyReducer, false);

  return (
    <ReadonlyContext.Provider value={isReadonly}>
      <ReadonlyDispatchContext.Provider value={dispatch}>
        {children}
      </ReadonlyDispatchContext.Provider>
    </ReadonlyContext.Provider>
  );
}

function readonlyReducer(_isReadonly: boolean, action: boolean): boolean {
  return action;
}

export function useReadonly() {
  return useContext(ReadonlyContext);
}

export function useReadonlyDispatch() {
  return useContext(ReadonlyDispatchContext);
}
