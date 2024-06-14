import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { axiosCommon } from "../../Hooks/useAxiosCommon";
import ClassCard from "../../components/ClassCard/ClassCard";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import { useState } from "react";

const Classes = () => {
  //pagination----
  const [page, setPage] = useState(1);
  const itemPerPage = 9;

  const { data } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/approved-classes-count`);
      return data;
    },
  });

  const count = data?.length;
  const numberOfPages = Math.ceil(count / itemPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  //pagination-------

  const { data: classes = [] } = useQuery({
    queryKey: ["approved-classes", page],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/approved-classes?page=${page}&size=${itemPerPage}`
      );
      return data;
    },
  });

  console.log(count);
  console.log(page, numberOfPages);

  return (
    <div className="min-h-[calc(100vh-240px)]">
      <Helmet>
        <title>ClassEdge | Classes</title>
      </Helmet>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {classes.map((clas) => (
          <ClassCard clas={clas} key={clas._id} />
        ))}
      </div>
      <PaginationComponent
        page={page}
        numberOfPages={numberOfPages}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Classes;
