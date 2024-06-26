import authImg from "../../assets/images/auth/authImg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { axiosCommon } from "../../Hooks/useAxiosCommon";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Login = () => {
  const { loginUser, loading, setLoading, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { res } = await axiosCommon.post("/users", data);
      return res;
    },
    onSuccess: () => {
      toast.success("Login success");
      navigate(location?.state ? `${location?.state}` : "/");
    },
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    loginUser(email, password)
      .then(async (result) => {
        await mutateAsync({
          name: result?.user?.displayName,
          email,
          role: "student",
          phoneNumber: result?.user?.phoneNumber,
        });
      })
      .catch((err) => {
        toast(`${err.message}`);
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

  return (
    <div>
      <Helmet>
        <title>ClassEdge | Sign In</title>
      </Helmet>
      <div className="min-h-screen bg-[#49c3af]">
        <div className="md:p-12 lg:p-24 ">
          <div className="md:px-8 md:py-4 shadow-xl mx-4 p-8 flex flex-col lg:flex-row gap-2  lg:gap-24 items-center">
            <div className="md:flex-1 md:block hidden">
              <img src={authImg} alt="" />
            </div>
            <div className="flex-1 w-full ">
              <h1 className="text-4xl text-center font-semibold my-8">
                Sign In
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mx-2 md:mx-8"
              >
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
                <div className="relative">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    className="w-full px-4 py-2 rounded-l"
                    type={`${!toggle?'password':'text'}`}
                    placeholder="Enter your password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <h1
                    onClick={() => setToggle(!toggle)}
                    className="absolute cursor-pointer top-1/2 right-4"
                  >
                    {!toggle ? "Show" : "Hide"}
                  </h1>
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}

                <div>
                  <button
                    disabled={loading}
                    className="w-full bg-[#dbb984] py-2 text-white my-4 font-semibold rounded-l"
                  >
                    {loading ? "Wait..." : "Sign In"}
                  </button>
                </div>
              </form>
              <div className="flex justify-center my-2">
                <div className="text-[#dbb984] flex gap-2">
                  <h1>New here?</h1>
                  <Link to={"/register"} className="font-bold">
                    Create a new account
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

export default Login;
