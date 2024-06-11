import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";
import Loading from "../../../../components/Loading/Loading";
import Profile from "../../../../components/Profile/Profile";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const AdminProfile = () => {
  const { user, loading, logOut } = useAuth();
  const [role] = useRole();

  if (loading) return <Loading />;
  return (
    <div>
      <SectionTitle
        heading={"My profile"}
        subHeading={"--------------------"}
      />
      <Profile user={user} role={role} logOut={logOut} />
    </div>
  );
};

export default AdminProfile;
