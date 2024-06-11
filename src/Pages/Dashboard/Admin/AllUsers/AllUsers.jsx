import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const AllUsers = () => {
    return (
        <div>
            <Helmet><title>ClassEdge | All Users</title></Helmet>
           <SectionTitle heading={'All Users'} subHeading={'------------------'}/>
        </div>
    );
};

export default AllUsers;