import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../../Hooks/useAxiosCommon";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";
import EnrollClassCard from "./EnrollClassCard";

const MyEnrollClass = () => {
  const { user, loading } = useAuth();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/payments/${user?.email}`);
      return data;
    },
  });

//   console.log(classes);

  if (loading || isLoading) return <Loading />;

  return (
    <div className="my-8 mx-2  w-full">
      <div className="grid md:grid-cols-2 gap-4">
        {classes.map((clas) => (
          <EnrollClassCard key={clas._id} clas={clas} />
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
