import { createContext, useContext } from "react";

// @ts-ignore
const userStoreContext = createContext<userStoreContextDto>(null);

export type userStoreDto = {
  _id: string;
  name: string;
};

export type userStoreContextDto = {
  userStore: userStoreDto | null;
  setUserStore: React.Dispatch<React.SetStateAction<userStoreDto>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
export default userStoreContext;
