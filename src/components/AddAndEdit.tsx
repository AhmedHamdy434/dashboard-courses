import { useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useState } from "react";
import { CourseType } from "../data/data";
const AddAndEdit = ({
  courseName,
  isNew,
}: {
  courseName?: string;
  isNew: boolean;
}) => {
  const navigate = useNavigate();
  const context = useCourses();
  if (!context) return;
  const { courses, setCourses } = context;

  const course = courses.find((cor) => cor.name === courseName);
  const otherCourses = courses.filter((cor) => cor.name !== courseName);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState<CourseType>({
    name: course?.name || "",
    description: course?.description || "",
    startDate: course?.startDate || "",
    endDate: course?.endDate || "",
    price: course?.price || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourses = isNew
      ? [...courses, { ...form }]
      : [...otherCourses, { ...form }];
    setCourses(newCourses);
    localStorage.setItem("courses", JSON.stringify(newCourses));
    navigate("/courses");
  };

  return (
    <div>
      <div className="container flex flex-col gap-8 justify-center rounded-2xl min-h-screen items-center">
        <h2 className="text-3xl font-bold">
          {isNew ? "Add New Course" : `Edit ${course?.name} course`}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[500px] p-8 bg-gray-800 space-y-2"
        >
          <div className="name">
            <label htmlFor="name">Name :</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="description">
            <label htmlFor="description">description :</label>
            <input
              placeholder="Enter description"
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="startDate">
            <label htmlFor="startDate">Start Date :</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="endDate">
            <label htmlFor="endDate">End Date :</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="price">
            <label htmlFor="price">Price :</label>
            <input
              placeholder="Enter Price"
              type="number"
              min={1}
              max={100000}
              name="price"
              id="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-2xl my-3 bg-main"
          >
            {isNew ? "Add" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAndEdit;
