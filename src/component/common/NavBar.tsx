import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userStoreContext from "../../store/userStore";
import useFetchHook from "../../hooks/useFetchHook";

const NavBar = () => {
  const { userStore , setUserStore , setIsAuthenticated} = useContext(userStoreContext);
  const navigate = useNavigate()
  const {data,loading, handleFetch } = useFetchHook({ isJsonContentType: true });

  useEffect(() => {
    if(data?._success){
        navigate("/login")
        setUserStore({_id : "", name : ""})
        setIsAuthenticated(false)
    }
  },[data, loading])
  
  return (
    <div className="w-full bg-gray-100 h-auto p-3">
      <div className="">
        <img
          src="/ems_logo.jpg"
          className="object-contain w-[50px] h-[50px] rounded-full"
          alt=""
        />
      </div>
      <div className="text-lg py-3 flex justify-between items-center max-w-[1420px] mx-auto">
        <div className="space-x-6">
          <Link to={"/"} className="">
            Home
          </Link>
          <Link to={"/employees"}>Employee List</Link>
        </div>
        <div className="space-x-6">
          <span className="">{userStore?.name}</span>
          <span onClick={() => {
            if(loading) return 
            handleFetch({method : "GET" , url: 'logout'})
          }}>Log out</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
