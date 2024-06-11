import Banner from "../Banner/Banner";
import Categories from "../Categroy/Categories";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-240px)]">
      <Banner />
      <div className="mx-2 md:mx-16 lg:mx-24">
        <Categories />
      </div>
    </div>
  );
};

export default Home;
