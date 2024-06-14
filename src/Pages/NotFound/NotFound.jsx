import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen items-center">
            <div className="text-center space-y-4">
                <h1 className="text-5xl">OOPS</h1>
                <p>404 NOT FOUND</p>
                <Link to={'/'}>
                    <button className="btn btn-secondary">Go Home</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;