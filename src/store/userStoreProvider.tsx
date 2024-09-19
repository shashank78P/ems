import React, { useState } from "react";
import userStoreContext, { userStoreDto } from "./userStore";

const UserStoreProvider = ({ children }: userStoreProviderType) => {
  const [userStore, setUserStore] = useState<userStoreDto>({
    _id: "",
    name: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <userStoreContext.Provider
      value={{
        userStore,
        setUserStore,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </userStoreContext.Provider>
  );
};

export default UserStoreProvider;

type userStoreProviderType = {
  children: React.ReactNode;
};
