import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import Payment from "../PaymentGateway/Payment/Payment";

const ClassDetails = () => {
  const axiosSecure = useAxiosSecure();

  const id = useParams();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["class-details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class/${id.id}`);
      return data;
    },
  });

  // console.log(data);
  const { image, name, email, title, description, enroll, price, category, _id } =
    data;
  if (isLoading) return <Loading />;
  return (
    <div className="min-h-[calc(100vh-240px)]">
      <div className="flex flex-col lg:flex-row my-8 gap-8 lg:gap-12 mx-2 md:mx-24">
        <div className="lg:w-1/2 space-y-2">
          <img src={image} className="w-full h-[50vh] object-cover" alt="" />
          <div className="p-4">
            <div>
              <h1 className="text-4xl font-semibold">{title}</h1>
            </div>
            <div>
              <p>
                <small>{description}</small>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:flex lg:flex-col gap-8 lg:items-start md:items-center p-4">
          <div className="">
            <div>
              <p>
                Posted by - <span className="font-bold">{name}</span>
              </p>
              <h2>Email: {email}</h2>
            </div>
            <div>
              <h1 className="font-bold">
                Category: <span className="uppercase">{category}</span>
              </h1>
            </div>
            <div className="text-xl mt-16">
              <h1>Total Enrollments: {enroll}</h1>
              <h1 className="text-3xl font-bold">Price: ${price}</h1>
            </div>
          </div>
          <div className="w-full py-12">
            {/* payment method */}
            <Payment id={_id} price={price}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
