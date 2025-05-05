import { CourseType } from "../data/data";
import Date from "./Date";
import CourseImage from "../assets/course.webp";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useEffect, useRef, useState } from "react";

const Card = ({ course }: { course: CourseType }) => {
  const deleteRef = useRef<HTMLDivElement>(null);
  const [deleteScreen, setDeleteScreen] = useState(false);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (deleteRef.current && !deleteRef.current.contains(e.target as Node))
        setDeleteScreen(false);
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  });

  const navigate = useNavigate();
  const context = useCourses();
  if (!context) return;

  const { courses, setCourses } = context;

  const handleDelete = (name: string) => {
    const newCourses = courses.filter((course) => course.name !== name);
    setCourses(newCourses);
    localStorage.setItem("courses", JSON.stringify(newCourses));
  };

  const { name, description, startDate, endDate, price } = course;

  return (
    <div className="relative bg-gray-800 rounded-2xl p-4 hover:-translate-y-2 transition-all duration-300">
      <a
        href={`/courses/${name}`}
        className="block border-b-1 border-amber-400"
      >
        <img
          src={CourseImage}
          className="rounded-2xl"
          alt={name}
          loading="lazy"
        />
        <h3 className="text-lg font-bold my-2">{name}</h3>
        <p className="text-sm my-2">{description}</p>
        <div className="date my-3 flex gap-4">
          {[startDate, endDate].map((date) => (
            <Date key={date} date={date} />
          ))}
        </div>
        <div className="price absolute top-2 right-2 rounded-full p-2 bg-main">
          {price} LE
        </div>
      </a>
      <div className="buttons relative flex my-5 justify-between items-center ">
        <button
          onClick={() => navigate(`/courses/edit/${name}`)}
          className="btn z-4 min-w-[70px]"
        >
          Edit
        </button>
        <button
          onClick={() => setDeleteScreen(true)}
          className="btn bg-red-500! z-4 min-w-[70px]"
        >
          Delete
        </button>
        {deleteScreen && (
          <div
            ref={deleteRef}
            className="deleteConfirm w-[200px] z-10 rounded-2xl bg-gray-300 absolute top-[100%] p-2 right-0"
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
  );
};

export default Card;
