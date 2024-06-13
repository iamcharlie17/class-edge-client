import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosCommon } from "../../../../Hooks/useAxiosCommon";
import Loading from "../../../../components/Loading/Loading";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";

const AssigmentPage = () => {
  const id = useParams();
  const { user } = useAuth();

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axiosCommon(`/assignments/${id.id}`);
      return res.data;
    },
  });

  //   console.log(assignments);

  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosCommon.put(`/assignment-submission`, data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        text: "Assignment Submission Success",
      });
    },
  });

  const handleSubmit = async (id) => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "PDF/Doc link",
      inputPlaceholder: "Enter your assignment link",
    });

    if (url) {
      await mutateAsync({
        assignmentId: id,
        email: user?.email,
        name: user?.name,
        link: url,
      });
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="my-8">
      <div className="text-end">
        <button className="px-4 py-2 mb-4 uppercase bg-[#49C3AF] text-white font-semibold rounded-sm">
          Evalution
        </button>
      </div>
      <SectionTitle
        heading={"Assignments"}
        subHeading={"----------------------------"}
      />
      <div className="overflow-x-auto bg-white p-8 shadow-lg">
        <table className="table">
          {/* head */}
          <thead className="bg-[#4AC2AE] text-white uppercase shadow-lg">
            <tr>
              <th>#</th>
              <th>title</th>
              <th>description</th>
              <th>deadline</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {assignments.map((assignment, idx) => (
              <tr key={assignment._id}>
                <th>{idx + 1}</th>
                <td>
                  <h1>{assignment.title}</h1>
                </td>
                <td>
                  <h1>{assignment.description}</h1>
                </td>
                <td>{assignment.deadline}</td>
                <th>
                  <button
                    onClick={() => handleSubmit(assignment._id)}
                    className="px-4 py-2 bg-[#4BC1AD] text-white rounded-sm"
                  >
                    Submit
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssigmentPage;
