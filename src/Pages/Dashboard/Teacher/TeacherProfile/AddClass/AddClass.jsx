import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../../../utils/uploadImage";
import { useMutation } from "@tanstack/react-query";
import { axiosCommon } from "../../../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../../components/Loading/Loading";

const AddClass = () => {
  const { user, setLoading, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imgbb = async (image) => {
    setLoading(true);
    const result = await uploadImage(image);
    return result;
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (classData) => {
      const { data } = await axiosCommon.post("/add-class", classData);
      return data;
    },
    onSuccess: () => {
      toast.success("Class added successfully");
      navigate("/dashboard/my-classes");
      setLoading(false);
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const image = await imgbb(data.photo[0]);
    const classInfo = {
      title: data.title,
      price: data.price,
      image,
      email: user?.email,
      name: user?.displayName,
      status: "pending",
      description: data.description,
      category: data.category,
      enroll: 0,
    };
    try {
      setLoading(true);
      await mutateAsync(classInfo);
    } catch (error) {
      toast.success(`${error.message}`);
      setLoading(false)
    }
  };

  if(loading) return <Loading/>

  return (
    <div>
      <Helmet>
        <title>ClassEdge | Dashboard | Add Class</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={"Add Class"}
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
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="w-full px-4 py-2 rounded-l"
            type="number"
            placeholder="Enter price"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="md:ml-4">
          <label htmlFor="name">Photo</label>
          <br />
          <input
            className="w-full px-4 py-2 rounded-l"
            type="file"
            name="photo"
            id="photo"
            {...register("photo", { required: true })}
          />
          {errors.photo && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="category">Category</label>
          <br />
          <select
            className="p-2 w-full"
            name="category"
            id=""
            {...register("category", { required: true })}
          >
            <option value="e-commerce">E-Commerce</option>
            <option value="web-development">Web Development</option>
            <option value="seo">SEO</option>
            <option value="start-up">Start Up</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="app-development">App Development</option>
            <option value="html">Html</option>
          </select>
          {errors.category && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="col-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            className="w-full p-4"
            name=""
            id=""
            cols="30"
            rows="10"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="text-center col-span-2">
          <button disabled={loading} className="py-2 px-8 bg-[#49c3af] text-white w-1/2 rounded-sm font-semibold">
            {loading ? "Wait..." : "Add Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
