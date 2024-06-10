import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure()

  const { data = [], isLoading } = useQuery({
    queryKey: ["role"],
    enabled: !!localStorage.getItem("accessToken"),
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  const roleInfo = data?.filter((d) => d?.email === user?.email);
  //    console.log(roleInfo)
  const role = roleInfo[0]?.role;
  return [role, isLoading];
};

export default useRole;
