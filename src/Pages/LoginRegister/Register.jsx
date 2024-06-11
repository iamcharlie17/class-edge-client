import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { uploadImage } from "../../utils/uploadImage";
import { axiosCommon } from "../../Hooks/useAxiosCommon";
import authImg from "../../assets/images/auth/authImg.png";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const { createUser, logOut, updateUser, setLoading, loading, googleLogin } =
    useAuth();
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
    mutationFn: async (data) => {
      const { res } = axiosCommon.post("/users", data);
      return res;
    },
    onSuccess: () => {
      toast.success("User created successfully");
      // console.log(image, "inside");
      logOut();
      navigate("/login");
      setLoading(false);
    },
  });

  const onSubmit = async (data) => {
    // setLoading(true)
    // await imgbb(data.photo[0]);
    // setLoading(false);

    const image = await imgbb(data.photo[0]);
    // console.log(image, "outside");

    const { name, email, password, phoneNumber } = data;
    await createUser(email, password)
      .then(() => {
        setLoading(true);
        updateUser(name, image, phoneNumber)
          .then(async () => {
            await mutateAsync({ name, email, role: "student", phoneNumber });
          })
          .catch((err) => {
            toast.error(`${err.message}`);
            setLoading(false);
          });
      })
      .catch((err) => {
        toast.error(`${err.message}`);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        await mutateAsync({
          name: result?.user?.displayName,
          email: result?.user?.email,
          role: "student",
          phoneNumber: result?.user?.phoneNumber,
        });
      })
      .catch((err) => {
        toast.error(`${err.message}`);
        setLoading(false);
      });
  };

  // if (loading) return <Loading />;

  return (
    <div>
      <Helmet>
        <title>ClassEdge | Sign Up</title>
      </Helmet>
      <div className="min-h-screen bg-[#49c3af]">
        <div className="md:p-12 lg:p-24 ">
          <div className="md:px-8 md:py-4 shadow-xl flex flex-col lg:flex-row-reverse gap-2 md:gap-8 lg:gap-24 items-center">
            <div className="flex-1">
              <img src={authImg} alt="" />
            </div>
            <div className="flex-1 w-full ">
              <h1 className="text-4xl text-center font-semibold my-8">
                Sign Up
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mx-2 md:mx-8"
              >
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

                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
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
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <br />
                  <input
                    className="w-full px-4 py-2 rounded-l"
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    {...register("phoneNumber", { required: true })}
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    className="w-full px-4 py-2 rounded-l"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^.{8,}$/,
                        message: "Password must be atleast 8 charaters",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    disabled={loading}
                    className="w-full bg-[#dbb984] py-2 text-white my-4 font-semibold rounded-l"
                  >
                    {loading ? "Wait..." : "Sign Up"}
                  </button>
                </div>
              </form>
              <div className="flex justify-center my-2">
                <div className="text-[#dbb984] flex gap-2">
                  <h1>Already have an account?</h1>
                  <Link to={"/login"} className="font-bold">
                    Login
                  </Link>
                </div>
              </div>
              <div>
                <div className="flex justify-center">
                  <div className=" w-full mx-auto flex justify-center items-center gap-4">
                    <h1 className="text-center">Or Sign In with---</h1>
                    <button
                      onClick={handleGoogleLogin}
                      className="p-2 rounded-lg border-black border "
                    >
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
