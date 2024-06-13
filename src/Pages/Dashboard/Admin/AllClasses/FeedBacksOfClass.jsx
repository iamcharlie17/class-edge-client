import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import Loading from "../../../../components/Loading/Loading";

const FeedBacksOfClass = () => {
  const id = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/feedback/${id.id}`);
      return data;
    },
  });

  if(isLoading) return <Loading/>
  return (
    <div>
      <Helmet>
        <title>ClassEdge | Feedbacks</title>
      </Helmet>
      <SectionTitle heading={"All Feedbacks"} subHeading={'------------------------------'} />
      <div>
        {feedbacks.map((f) => (
          <div key={f._id} className="flex flex-col lg:flex-row gap-4 p-8 border-b">
            <img
              src={f.image}
              className="h-72 md:h-80 lg:w-1/3 object-cover"
              alt=""
            />

            <div className="flex-1 space-y-2 px-4">
              <div>
                <Rating style={{ maxWidth: 250 }} value={f.ratings} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{f.title}</h1>
              </div>
              <div>
                <FaQuoteLeft size={30} />
                <p className="p-4">
                  <small>{f.feedback}</small>
                </p>
                <div className="flex justify-end">
                  <FaQuoteRight size={30} />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-2xl">-{f.name}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedBacksOfClass;
