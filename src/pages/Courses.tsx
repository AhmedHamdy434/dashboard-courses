import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useCourses } from "../context/CourseContext";
import { useState } from "react";

const Courses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const context = useCourses();
  if (!context) return;

  const { courses } = context;
  const coursesToShow = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="container">
        <h2 className="text-3xl font-bold my-6">Search</h2>
        <input
          className="my-2"
          placeholder="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <h2 className="text-3xl my-8 font-bold">Courses List</h2>
        {coursesToShow.length < 1 ? (
          <h2 className="text-3xl text-center font-bold">No Courses Found</h2>
        ) : (
          <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {coursesToShow.map((course) => (
              <Card key={course.name} course={course} />
            ))}
          </div>
        )}
        <div className="text-end my-12">
          <button
            onClick={() => navigate("/courses/new")}
            className="px-6 py-3 rounded-2xl bg-main hover:opacity-90 cursor-pointer"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
