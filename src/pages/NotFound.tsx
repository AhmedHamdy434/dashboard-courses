import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center text-4xl text-red-500">
      <h4>404 Not Found</h4>
      <button onClick={() => navigate("/courses")} className="btn text-lg!">
        Go to Course Page
      </button>
    </div>
  );
};

export default NotFound;
