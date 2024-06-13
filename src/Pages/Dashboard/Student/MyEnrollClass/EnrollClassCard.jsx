import { Link } from "react-router-dom";

const EnrollClassCard = ({ clas }) => {
  const { title, name, image } = clas || "";
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg shadow-lg ">
      <img src={image} className="object-cover w-full h-56" alt="" />

      <div className="py-5 text-center">
        <a className="block text-xl font-bold " role="link">
          {title}
        </a>
        <span className="text-sm ">Posted by - {name}</span>
      </div>
      <Link to={`/dashboard/my-enroll-class/${clas._id}`}>
        <div className="text-center">
          <button className="px-4 py-2 mb-4 uppercase bg-[#49C3AF] text-white font-semibold rounded-sm">
            Continue
          </button>
        </div>
      </Link>
    </div>
  );
};

export default EnrollClassCard;
