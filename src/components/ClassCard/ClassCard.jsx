import { Link } from "react-router-dom";

const ClassCard = ({ clas }) => {
  return (
    <div>
      <div className=" p-8 shadow-lg flex flex-col justify-between min-h-[700px]">
        <div>
          <img
            src={clas.image}
            className="w-full h-72 object-cover rounded-t-lg object-center"
            alt=""
          />
          <div>
            <h1 className="text-2xl font-semibold">{clas.title}</h1>
            <h2>
              Posted by - <span className="font-bold">{clas.name}</span>
            </h2>
            <p>
              <small>{clas.description.slice(0, 200)}....</small>
            </p>
          </div>
        </div>

        <div>
          <div>
            <h2 className="font-medium">Total Enrollments: {clas.enroll}</h2>
            <h1 className="text-xl font-bold">Price: ${clas.price}</h1>
          </div>
          <div className="text-center">
            <Link to={`/class/${clas._id}`}>
              <button className="w-1/2  uppercase font-bold text-white bg-[#4AC2AE] mt-8 py-2">
                Enroll
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
