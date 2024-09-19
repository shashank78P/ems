import { useState } from "react";

const useFetchHook = ({
  isJsonContentType = true,
}: {
  isJsonContentType?: boolean;
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | any>(null);

  const handleFetch = ({ method, url, body }: handleFetchProp) => {
    console.log("called");

    let payload: any = {
      method,
      // (headers: { "content-type": (isJsonContentType ? "application/json" : "multipart/form-data") },)
      credentials: "include",
    };

    if (isJsonContentType) {
      payload["headers"] = { "content-type": "application/json" };
    }

    if (method != "GET") {
      payload["body"] = body ?? {};
    }

    setLoading(true);
    console.log(import.meta.env);

    fetch(`${import.meta.env.VITE_API_URL}/${url}`, payload)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res._success) {
          setData(res);
          setError(false);
        } else {
          setError(true);
          setData(null);
        }
        setMessage(res?._message);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleFetch,
    data,
    error,
    message,
    loading,
  };
};

export default useFetchHook;

type handleFetchProp = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: any;
};

type responseType = {
  _statusCode: number;
  _data: any;
  _message: string;
  _success: boolean;
};
