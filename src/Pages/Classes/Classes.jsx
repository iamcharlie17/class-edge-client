import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { axiosCommon } from "../../Hooks/useAxiosCommon";
import ClassCard from "../../components/ClassCard/ClassCard";


const Classes = () => {
    const {data: classes =[]} = useQuery({
        queryKey: ['approved-classes'],
        queryFn: async () => {
            const {data} = await axiosCommon.get('/approved-classes')
            return data;
        }
    })
    console.log(classes)
    return (
        <div className="min-h-[calc(100vh-240px)]">
            <Helmet><title>ClassEdge | Classes</title></Helmet>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                {classes.map(clas => <ClassCard clas={clas} key={clas._id}/>)}
            </div>
        </div>
    );
};

export default Classes;