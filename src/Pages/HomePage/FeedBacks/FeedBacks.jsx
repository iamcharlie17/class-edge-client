import { Swiper, SwiperSlide } from "swiper/react";
import { IoStar } from "react-icons/io5";

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

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
        pagination={{
          type: "fraction",
        }}
        autoplay={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper my-8"
      >
        {feedbacks.slice(0, 6).map((f) => (
          <SwiperSlide key={f._id}>
            <div className="flex flex-col md:flex-row gap-4">
              <img src={f.image} className="h-72 w-1/3 object-cover" alt="" />

              <div className="flex-1">
                <div>
                    
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
