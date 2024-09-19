import React, { useContext, useEffect } from "react";
import useFetchHook from "../hooks/useFetchHook";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/common/NavBar";
import userStoreContext from "../store/userStore";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { data, error, handleFetch, loading, message } = useFetchHook({isJsonContentType : true});
  const { setUserStore, isAuthenticated, setIsAuthenticated } = useContext(userStoreContext);

  useEffect(() => {
    handleFetch({ method: "GET", url: "/admin/get-me" });
  }, [isAuthenticated]);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setUserStore({ _id: "", name: "" });
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      setUserStore({ _id: data?._data?._id, name: data?._data?.name });
      setIsAuthenticated(true);
    }
  }, [data?._data, error, loading, message]);

  return (
    <div className="text-gray-700">
      <NavBar />
      {children}
    </div>
  );
};

export default Protected;
