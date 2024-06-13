import { Swiper, SwiperSlide } from "swiper/react";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const FeedBacks = () => {
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/feedback");
      return data;
    },
  });

  return (
    <div>
      <SectionTitle heading={"What our students say?"} />
      <Swiper
        // pagination={{
        //   type: "fraction",
        // }}
        autoplay={{
          delay: 2500,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper my-8"
      >
        {feedbacks.map((f) => (
          <SwiperSlide key={f._id}>
            <div className="flex flex-col lg:flex-row gap-4 p-8">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedBacks;
