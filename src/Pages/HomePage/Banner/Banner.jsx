import { Link } from "react-router-dom";
import banner1 from "../../../assets/images/banner/banner1.jpeg";
import banner2 from "../../../assets/images/banner/banner2.jpeg";
import banner3 from "../../../assets/images/banner/banner3.jpg";
import banner4 from "../../../assets/images/banner/banner4.jpeg";

const Banner = () => {
  return (
    <div className="carousel w-full ">
      <div
        id="slide1"
        className=" bg-cover text-center flex flex-col justify-center carousel-item relative w-full min-h-[80vh]"
        style={{
          backgroundImage: `url(${banner1})`,
        }}
      >
        <div className="space-y-4">
          <h1 className="md:text-6xl text-white font-semibold">ClassEdge</h1>
          <h1 className="md:text-6xl text-white font-semibold">
            Learning Courses
          </h1>
          <div className="flex justify-center">
            <div className="flex gap-4 font-semibold my-16">
              <button className="py-2 px-8 border border-white hover:scale-105 transition-transform text-white rounded-sm">
                About Us
              </button>
              <Link to={"/all-classes"}>
                <button className="py-2 px-8 hover:scale-105 transition-transform text-white bg-[#49c3af]">
                  Classes
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide2"
        className=" bg-cover text-center flex flex-col justify-center carousel-item relative w-full min-h-[80vh]"
        style={{
          backgroundImage: `url(${banner3})`,
        }}
      >
        <div className="space-y-4">
          <h1 className="md:text-6xl text-white font-semibold">ClassEdge</h1>
          <h1 className="md:text-6xl text-white font-semibold">
            Learning Courses
          </h1>
          <div className="flex justify-center">
            <div className="flex gap-4 font-semibold my-16">
              <button className="py-2 px-8 border border-white hover:scale-105 transition-transform text-white rounded-sm">
                About Us
              </button>
              <Link to={"/all-classes"}>
                <button className="py-2 px-8 hover:scale-105 transition-transform text-white bg-[#49c3af]">
                  Classes
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide3"
        className=" bg-cover text-center flex flex-col justify-center carousel-item relative w-full min-h-[80vh]"
        style={{
          backgroundImage: `url(${banner2})`,
        }}
      >
        <div className="space-y-4">
          <h1 className="md:text-6xl text-white font-semibold">ClassEdge</h1>
          <h1 className="md:text-6xl text-white font-semibold">
            Learning Courses
          </h1>
          <div className="flex justify-center">
            <div className="flex gap-4 font-semibold my-16">
              <button className="py-2 px-8 border border-white hover:scale-105 transition-transform text-white rounded-sm">
                About Us
              </button>
              <Link to={"/all-classes"}>
                <button className="py-2 px-8 hover:scale-105 transition-transform text-white bg-[#49c3af]">
                  Classes
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide4"
        className=" bg-cover text-center flex flex-col justify-center carousel-item relative w-full min-h-[80vh]"
        style={{
          backgroundImage: `url(${banner4})`,
        }}
      >
        <div className="space-y-4">
          <h1 className="md:text-6xl text-white font-semibold">ClassEdge</h1>
          <h1 className="md:text-6xl text-white font-semibold">
            Learning Courses
          </h1>
          <div className="flex justify-center">
            <div className="flex gap-4 font-semibold my-16">
              <button className="py-2 px-8 border border-white hover:scale-105 transition-transform text-white rounded-sm">
                About Us
              </button>
              <Link to={"/all-classes"}>
                <button className="py-2 px-8 hover:scale-105 transition-transform text-white bg-[#49c3af]">
                  Classes
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
