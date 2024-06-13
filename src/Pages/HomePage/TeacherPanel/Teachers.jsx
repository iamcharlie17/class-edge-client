import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import TeacherCard from "../../../components/TeacherCard/TeacherCard";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";

const Teachers = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = axiosCommon.get("/accepted-teachers");
      return (await res).data;
    },
  });

  //get 6 teachers only
  const teachers = data.slice(0, 6) || [];
  // console.log(teachers);

  if (isLoading) return <Loading />;
  return (
    <div>
      <SectionTitle heading={"Meet Our Experts"} subHeading={"The Best Teachers"} />
      <div className="grid lg:grid-cols-3 mx-auto gap-4 md:gap-8 my-8">
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} key={teacher._id} />
        ))}
      </div>
      <div className="text-center my-4">
        <Link to={"/all-teachers"}>
          <button className="uppercase bg-[#49C3B0] text-white py-2 px-4 hover:scale-105 transition-transform rounded-sm">
            See All teachers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Teachers;
