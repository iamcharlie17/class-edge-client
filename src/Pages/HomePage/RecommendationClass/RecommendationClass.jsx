import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
// import { Swiper } from "swiper/types";

const RecommendationClass = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes-popular"],
    queryFn: async () => {
      const res = await axiosCommon.get("/popular-classes");
      return res.data;
    },
  });

  // console.log(classes)

  return (
    <div>
      <SectionTitle
        heading={"Popular Classes"}
        subHeading={"Student's Choice"}
      />
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
        {classes.slice(0, 6).map((c) => (
          <SwiperSlide key={c._id}>
            <div className="flex flex-col bg-gray-200 rounded-sm lg:flex-row gap-4 p-8">
              <img
                src={c.image}
                className="h-72 md:h-80 lg:w-1/3 object-cover"
                alt=""
              />

              <div className="flex-1 space-y-2 px-4">
                <div className="flex flex-col w-full  lg:h-full md:h-[30vh] h-[50vh] justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-semibold">{c.title}</h1>
                    <p>
                      <small>{c.description.slice(0, 400)}...</small>
                    </p>
                  </div>
                  <div className="font-semibold">
                    <h1>Teacher: {c.name}</h1>
                    <h1>Enrollments: {c.enroll}</h1>
                    <h1 className="text-2xl font-bold">Price: ${c.price}</h1>
                  </div>
                  <div>
                    <Link to={`/class/${c._id}`}>
                      <button className="w-1/2  uppercase font-bold text-white bg-[#4AC2AE] mt-8 py-2">
                        Enroll Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendationClass;
