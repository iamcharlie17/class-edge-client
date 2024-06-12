import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { uploadImage } from "../../utils/uploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const TeachOnClassEdge = () => {
  const { user, setLoading, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { data = [] } = useQuery({
    queryKey: ["exist-teacher"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/teachers`)
      return data;
    },
  });

//   console.log(data);
  const teacherInfo = data?.filter(d => d.email === user?.email) || []
  const teacher = teacherInfo[0] || {}
  const status = teacher?.status || ''

  const imgbb = async (image) => {
    setLoading(true);
    const result = await uploadImage(image);
    return result;
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/teachers", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request sent. Wait for admin approval!!");
      setLoading(false);
      navigate("/");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
      setLoading(false);
      navigate("/");
    },
  });

  useEffect(() => {
    setValue("name", user?.displayName);
    setValue("email", user?.email);
  }, [setValue, user?.displayName, user?.email]);

  const onSubmit = async (data) => {
    // console.log(data.photo[0]);
    const { name, email, title, experience, category } = data;
    if (data.photo.length > 0) {
      const image = await imgbb(data.photo[0]);
      try {
        await mutateAsync({
          name,
          email,
          title,
          experience,
          category,
          image,
          status: "pending",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await mutateAsync({
        name,
        email,
        title,
        experience,
        category,
        image: user?.photoURL,
        status: "pending",
      });
    }
  };

  if(isPending || loading) return <Loading/>
  return (
    <div className="min-h-[calc(100vh-240px)]">
      <Helmet>
        <title>ClassEdge | Teach On ClassEdge</title>
      </Helmet>
      <div className="my-8">
        <form
          className="bg-slate-100 p-4 md:p-8 md:mx-8 lg:w-2/3 lg:mx-auto rounded-sm md:grid grid-cols-2 gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <h1 className=" md:text-4xl pb-4 border-b border-[#4AC2AE] text-[#4AC2AE]  font-bold text-center">
              Teacher Request Form
            </h1>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="w-full px-4 py-2 rounded-l"
              type="text"
              name="name"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              disabled={true}
              className="w-full px-4 py-2 rounded-l"
              type="email"
              name="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
              className="w-full px-4 py-2 rounded-l"
              type="text"
              name="title"
              placeholder="Enter your title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
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
          <div>
            <label htmlFor="experience">Experience</label>
            <br />
            <select
              className="p-2 w-full"
              name="experience"
              id=""
              {...register("experience", { required: true })}
            >
              <option value="beginner">Beginner</option>
              <option value="experienced">Experienced</option>
              <option value="mid-level">Mid Level</option>
            </select>
            {errors.experience && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
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
          <div className="text-center col-span-2 my-4">
            <button disabled={status === 'pending'} className="w-1/2 bg-[#4AC2AE] text-white font-semibold py-2 rounded-sm">
              {status === 'rejected'? "Request To Another": "Submit For Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeachOnClassEdge;
