import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const AdminContext = createContext(false);
const AdminDispatchContext = createContext<Dispatch<boolean>>(() => {});

export function AdminProvider({ children, isBoardOwner }: any) {
  const [isAdmin, dispatch] = useReducer(AdminReducer, isBoardOwner);

  useEffect(() => dispatch(isBoardOwner), [isBoardOwner]);

  return (
    <AdminContext.Provider value={isAdmin}>
      <AdminDispatchContext.Provider value={dispatch}>
        {children}
      </AdminDispatchContext.Provider>
    </AdminContext.Provider>
  );
}

function AdminReducer(_isAdmin: boolean, action: boolean): boolean {
  return action;
}

export function useAdmin() {
  return useContext(AdminContext);
}

export function useAdminDispatch() {
  return useContext(AdminDispatchContext);
}
