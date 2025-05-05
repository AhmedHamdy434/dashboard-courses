import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import NotFound from "./NotFound";
import CourseImage from "../assets/course.webp";
import { useRef, useState } from "react";

const CourseDetails = () => {
  const deleteRef = useRef<HTMLDivElement>(null);
  const [deleteScreen, setDeleteScreen] = useState(false);

  const navigate = useNavigate();
  const { courseName } = useParams();
  const context = useCourses();
  if (!context) return;
  const { courses, setCourses } = context;

  const course = courses.find(
    (cor) => cor.name.toLowerCase() === courseName?.toLowerCase()
  );

  if (!course) return <NotFound />;

  const handleDelete = (name: string) => {
    const newCourses = courses.filter((course) => course.name !== name);
    setCourses(newCourses);
    localStorage.setItem("courses", JSON.stringify(newCourses));
    navigate("/courses");
  };

  const { name, description, startDate, endDate, price } = course;

  return (
    <div>
      <div className="container flex flex-col flex-wrap items-center gap-4 md:flex-row md:justify-between md:gap-x-[50px] lg:gap-x-[200px]">
        <div>
          <h3 className="text-2xl font-bold my-20">{name} Course</h3>
          <img
            src={CourseImage}
            alt={name}
            loading="lazy"
            className="w-full max-w-[450px]"
          />
        </div>
        <div className="descrip flex-1">
          <p className="my-2">
            <span>Description :</span> {description}
          </p>
          <div className="my-3">
            <span>Start Date :</span> {startDate}
          </div>
          <div className="my-3">
            <span>End Date :</span> {endDate}
          </div>
          <span>price : {price} LE</span>
        </div>
        <div className="w-full pl-6 relative">
          <button
            onClick={() => navigate(`/courses/edit/${name}`)}
            className="btn w-25! my-6"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteScreen(true)}
            className="btn bg-red-500! w-25!"
          >
            Delete
          </button>
          {deleteScreen && (
            <div
              ref={deleteRef}
              className="deleteConfirm w-[200px] z-10 rounded-2xl bg-gray-300 absolute top-[100%] p-2 left-0"
            >
              <h3 className="my-2  text-red-500">
                Are you sure to delete {name} course !!
              </h3>
              <div className="buttons flex justify-evenly mb-2">
                <div
                  onClick={() => setDeleteScreen(false)}
                  className="button btn"
                >
                  Cancel
                </div>
                <div
                  onClick={() => handleDelete(name)}
                  className="button btn bg-red-500!"
                >
                  Delete
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
