import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../components/Loading/Loading";


const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to={"/login"} state={location.pathname} />;
  return children;
};

export default PrivateRoute;
