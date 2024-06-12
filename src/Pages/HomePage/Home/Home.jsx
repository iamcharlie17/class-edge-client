
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Categories from "../Categroy/Categories";
import Sponsor from "../Sponsor/Sponsor";
import Teachers from "../TeacherPanel/Teachers";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-240px)]">
      <Helmet><title>ClassEdge | Home</title></Helmet>
      <Banner />
      <div className="mx-2 md:mx-16 lg:mx-24">
        <Sponsor/>
        <Categories />
        <Teachers/>
      </div>
    </div>
  );
};

export default Home;
