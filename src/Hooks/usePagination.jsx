import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../Hooks/useAxiosCommon";
import { useState } from "react";


function usePagination(url){

    const [page, setPage] = useState(1);
  const itemPerPage = 10;

  const { data } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`${url}`);
      return data;
    },
  });

  const count = data?.count;
  const numberOfPages = Math.ceil(count / itemPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

    return [page, itemPerPage, numberOfPages, handleChange]
}

export default usePagination;