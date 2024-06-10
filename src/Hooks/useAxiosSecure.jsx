import axios from "axios";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3200/",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  //request interceptor for every secure api call
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("accessToken");
      // console.log('request stopped by interceptors', token)
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  //intercepts 401 and 403
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut();
       <Navigate to={'/'} ></Navigate>
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
