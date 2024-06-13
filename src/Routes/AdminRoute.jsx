import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../components/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [role, isLoading] = useRole();
  //   console.log(role, loading, isLoading);

  if (loading || isLoading) return <Loading />;
  if (user?.role !== role && !user) return <Navigate to={"/"} />;

  return children;
};

export default AdminRoute;
