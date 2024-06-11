import useAuth from "../../../../Hooks/useAuth";
import Profile from "../../../../components/Profile/Profile";
import useRole from "../../../../Hooks/useRole"
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import Loading from "../../../../components/Loading/Loading";

const TeacherProfile = () => {
    const {user, loading, logOut} = useAuth()
    const [role] = useRole()

    if(loading) return <Loading/>
    return (
        <div>
            <SectionTitle heading={'My profile'} subHeading={'--------------------'}/>
            <Profile user={user} role={role} logOut={logOut}/>
        </div>
    );
};

export default TeacherProfile;