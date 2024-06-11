import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import appDev from "../../../assets/images/categories/app-dev.jpeg";
import eCommerce from "../../../assets/images/categories/e-commerce.jpeg";
import graphicDesign from "../../../assets/images/categories/graphic-design.jpeg";
import html from "../../../assets/images/categories/html.jpeg";
import seo from "../../../assets/images/categories/seo.jpeg";
import webDev from "../../../assets/images/categories/web-dev.jpeg";
import startUp from "../../../assets/images/categories/start-up.jpeg";
import { FaCloudUploadAlt } from "react-icons/fa";

const Categories = () => {
  return (
    <div className="my-8">
      <SectionTitle
        heading={"Our Categories"}
        subHeading={"The Best Courses"}
      />
      <div className="grid lg:grid-cols-4 gap-8 ">
        <div className="text-white relative hover:scale-95 transition-transform w-full">
          <img className="w-full" src={eCommerce} alt="" />
          <div className="absolute bottom-5 flex gap-4 items-center px-8 z-10">
            <div className="p-2 bg-[#49c3af] w-12 h-12 flex justify-center rounded-full">
              <FaCloudUploadAlt size={25} />
            </div>
            <h1 className="text-xl">e-Commerce</h1>
          </div>
        </div>
        <div className="text-white relative hover:scale-95 transition-transform w-full lg:col-span-2">
          <img className="w-full" src={webDev} alt="" />
          <div className="absolute bottom-5 flex gap-4 items-center px-8 z-10">
            <div className="p-2 bg-[#ffb730] w-12 h-12 flex justify-center rounded-full">
              <FaCloudUploadAlt size={25} />
            </div>
            <h1 className="text-xl">Web Development</h1>
          </div>
        </div>
        <div className="text-white relative hover:scale-95 transition-transform w-full">
          <img className="w-full" src={seo} alt="" />
          <div className="absolute bottom-5 flex gap-4 items-center px-8 z-10">
            <div className="p-2 bg-[#fe6f58] w-12 h-12 flex justify-center rounded-full">
              <FaCloudUploadAlt size={25} />
            </div>
            <h1 className="text-xl">SEO</h1>
          </div>
        </div>
        <div className="text-white relative hover:scale-95 transition-transform w-full">
          <img className="w-full" src={startUp} alt="" />
          <div className="absolute bottom-5 flex gap-4 items-center px-8 z-10">
            <div className="p-2 bg-[#49c3af] w-12 h-12 flex justify-center rounded-full">
              <FaCloudUploadAlt size={25} />
            </div>
            <h1 className="text-xl">Start Up</h1>
          </div>
        </div>
        <div className="text-white relative hover:scale-95 transition-transform w-full">
          <img className="w-full" src={graphicDesign} alt="" />
          <div className="absolute bottom-5 flex gap-4 items-center px-8 z-10">
            <div className="p-2 bg-[#ffb730] w-12 h-12 flex justify-center rounded-full">
              <FaCloudUploadAlt size={25} />
            </div>
            <h1 className="text-xl">Graphic Design</h1>
          </div>
        </div>
        <div className="text-white relative hover:scale-95 transition-transform w-full">
          <img className="w-full" src={appDev} alt="" />
          <div className="absolute bottom-5 flex gap-4 items-center px-8 z-10">
            <div className="p-2 bg-[#fe6f58] w-12 h-12 flex justify-center rounded-full">
              <FaCloudUploadAlt size={25} />
            </div>
            <h1 className="text-xl">App Development</h1>
          </div>
        </div>
        <div className="text-white relative hover:scale-95 transition-transform w-full">
          <img className="w-full" src={html} alt="" />
          <div className="absolute bottom-5 flex gap-4 items-center px-8 z-10">
            <div className="p-2 bg-[#49c3af] w-12 h-12 flex justify-center rounded-full">
              <FaCloudUploadAlt size={25} />
            </div>
            <h1 className="text-xl">Html</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
