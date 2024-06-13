import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

//   console.log(user)

  const axiosSecure = useAxiosSecure()

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["role"],
    // enabled: !!localStorage.getItem("accessToken"),
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const roleInfo = data?.filter((d) => d?.email === user?.email);
    //  console.log(roleInfo)

  const role = roleInfo[0]?.role;
  const phoneNumber = roleInfo[0]?.phoneNumber
  return [role, isLoading, refetch, phoneNumber];
};

export default useRole;
