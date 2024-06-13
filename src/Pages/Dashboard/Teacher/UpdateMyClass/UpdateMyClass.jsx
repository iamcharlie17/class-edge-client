import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../../utils/uploadImage";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../../../components/Loading/Loading";

const UpdateMyClass = () => {
  const id = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate()

  const { data: singleClass = {}, isLoading, refetch } = useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id.id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue("title", singleClass?.title);
    setValue("price", singleClass?.price);
    setValue("category", singleClass?.category);
    setValue("description", singleClass?.description);
  }, [setValue, singleClass.title, singleClass.price, singleClass.category, singleClass.description]);

  const imgbb = async (image) => {
    setLoading(true);
    const result = await uploadImage(image);
    return result;
  };

  const {mutateAsync} = useMutation({
    mutationFn: async (data) =>{
        const res = await axiosSecure.put(`/update-class/${id.id}`, data)
        return res.data;
    },
    onSuccess: ()=>{
        toast.success('Class Updated')
        refetch()
        navigate('/dashboard/my-classes')
        setLoading(false)
    }
  })

  const onSubmit = async (data) => {
    // console.log(data);
    if (data.photo.length > 0) {
      const image = await imgbb(data.photo[0]);
      const classInfo = {
        title: data.title,
        price: data.price,
        image,
        description: data.description,
        category: data.category,
      };
      await mutateAsync(classInfo)

    } else {
      const classInfo = {
        title: data.title,
        price: data.price,
        image: singleClass.image,
        description: data.description,
        category: data.category,
      };
      await mutateAsync(classInfo)
    }
    // try {
    //   setLoading(true);
    //   await mutateAsync(classInfo);
    // } catch (error) {
    //   toast.success(`${error.message}`);
    //   setLoading(false);
    // }
  };

//   console.log(singleClass);

if(isLoading) return <Loading/>

  return (
    <div>
      <Helmet>
        <title>ClassEdge | Dashboard | Update Class</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={"Update Class"}
          subHeading={`by - ${user?.displayName}, ${user?.email}`}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mx-2 md:mx-8 p-4 md:p-12 bg-slate-100 shadow-lg rounded-sm md:grid grid-cols-2 gap-2"
      >
        <div className="col-span-2">
          <label htmlFor="title">Title</label>
          <br />
          <input
            className="w-full px-4 py-2 rounded-l"
            type="text"
            placeholder="Enter title"
            {...register("title")}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="w-full px-4 py-2 rounded-l"
            type="number"
            placeholder="Enter price"
            {...register("price")}
          />
        </div>
        <div className="md:ml-4">
          <label htmlFor="name">Photo</label>
          <br />
          <input
            className="w-full px-4 py-2 rounded-l"
            type="file"
            name="photo"
            id="photo"
            {...register("photo")}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="category">Category</label>
          <br />
          <select
            className="p-2 w-full"
            name="category"
            id=""
            {...register("category")}
          >
            <option value="e-commerce">E-Commerce</option>
            <option value="web-development">Web Development</option>
            <option value="seo">SEO</option>
            <option value="start-up">Start Up</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="app-development">App Development</option>
            <option value="html">Html</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            className="w-full p-4"
            name=""
            id=""
            cols="30"
            rows="8"
            {...register("description")}
          ></textarea>
        </div>
        <div className="text-center col-span-2">
          <button
            disabled={loading}
            className="py-2 px-8 bg-[#49c3af] text-white w-1/2 rounded-sm font-semibold"
          >
            {loading ? "Wait..." : "Update Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyClass;
