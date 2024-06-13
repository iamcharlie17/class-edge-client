import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";

const Stats = () => {
  const [clas, setClasses] = useState([]);
  useEffect(() => {
    axiosCommon.get("/all-classes").then((res) => setClasses(res.data));
  }, []);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosCommon.get("/users");
      return res.data;
    },
  });

  const classes = clas.filter((c) => c.status === "approved");

  const totalEnroll = classes.reduce(
    (totalEnroll, clas) => totalEnroll + parseInt(clas.enroll),
    0
  );

  return (
    <div>
      <SectionTitle
        heading={"Statistics"}
        subHeading={"This Platform's Quality"}
      />
      <div className="p-12 bg-[#4AC2AE] rounded-sm">
        <div className="stats shadow-lg my-8 stats-vertical lg:stats-horizontal w-full text-center py-12 ">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{users?.length}</div>
            <div className=" flex justify-center">
              <FaUsers size={35} />
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Classes</div>
            <div className="stat-value">{classes?.length}</div>
            <div className=" flex justify-center">
              <SiGoogleclassroom size={35} />
            </div>
          </div>

          <div className="stat ">
            <div className="stat-title">Total Enrollments</div>
            <div className="stat-value">{totalEnroll}</div>
            <div className=" flex justify-center">
              <MdOutlinePayment size={35} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
