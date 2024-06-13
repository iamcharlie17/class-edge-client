import { Link } from "react-router-dom";
import tearcherImg from "../../../assets/images/teacher/teacher7.jpg";
import useRole from "../../../Hooks/useRole";
import toast from "react-hot-toast";

const TeacherRequest = () => {
  const [role] = useRole();

  return (
    <div className="my-12 bg-gray-400 py-16 rounded-sm">
      <div className="flex w-2/3 mx-auto h-64 bg-[#4AC2AF] rounded-lg shadow-lg ">
        <div
          className="w-1/3 bg-cover"
          style={{
            backgroundImage: `url(${tearcherImg})`,
          }}
        ></div>

        <div className="w-2/3 p-4 md:p-4 flex flex-col justify-center">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Become an instructor
          </h1>

          <p className="mt-2 text-sm ">
            Instructor from around the world teach million of learners on
            ClassEdge. We provide the tools and skills to teach what you love
          </p>

          {role === "teacher" ? (
            <button
              onClick={() => {
                toast.success("You are already a teacher");
              }}
              className="px-4 py-2 mb-4 w-2/3 mt-3 uppercase bg-black text-white font-semibold rounded-sm"
            >
              Submit Request for Teaching
            </button>
          ) : (
            <Link to={"/teach-on-classedge"}>
              <div className="flex justify-between mt-3 item-center">
                <button className="px-4 py-2 mb-4 uppercase bg-black text-white font-semibold rounded-sm">
                  Submit Request for Teaching
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherRequest;
