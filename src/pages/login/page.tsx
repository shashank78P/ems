import { useContext, useEffect, useRef } from "react";
import Button from "../../component/UI/button";
import Input from "../../component/UI/Input";
import InputContainer from "../../component/UI/InputContainer";
import useFetchHook from "../../hooks/useFetchHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userStoreContext from "../../store/userStore";

const LogIn = () => {
  const userNameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const { data, error, handleFetch, loading, message } = useFetchHook({isJsonContentType : true});
  const navigate = useNavigate();
  const { setIsAuthenticated , isAuthenticated } = useContext(userStoreContext);

  useEffect(() => {
    if (error) {
      toast.error("Login failed!.");
    } else if (data?._success) {
      setIsAuthenticated(true);
      navigate("/");
      toast.success("Login Successful!.");
    }
  }, [data, error, loading, message]);
  
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/");
    }
  },[isAuthenticated])

  return (
    <div className="w-full h-screen shadow-md grid place-content-center">
      <div className="max-w-[600px] min-w-[500px] border rounded-lg p-6 space-y-6">
        <h1 className="text-center text-3xl text-gray-700">Log In</h1>
        <form
          action=""
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();

            if (loading) return;

            handleFetch({
              method: "POST",
              url: "login/",
              body: JSON.stringify({
                userName: userNameRef?.current?.value,
                password: passwordRef?.current?.value,
              }),
            });
          }}
        >
          <InputContainer label="User Name">
            <Input
              name="User Name"
              type="text"
              required={true}
              ref={userNameRef}
              placeholder="John Doe"
            />
          </InputContainer>
          <InputContainer label="Password">
            <Input
              name="Password"
              type="password"
              required={true}
              ref={passwordRef}
              placeholder="password"
            />
          </InputContainer>

          <div className="w-full mt-3 flex justify-end items-center">
            <Button type="submit" classNameStyle="">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
