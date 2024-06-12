import { useQuery } from "@tanstack/react-query";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const AllTeachers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = axiosSecure.get("/accepted-teachers");
      return (await res).data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-240px)]">
      <div className="grid mx-2 md:mx-24 lg:grid-cols-3  gap-4 md:gap-8 my-8">
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} key={teacher._id} />
        ))}
      </div>
    </div>
  );
};

export default AllTeachers;
