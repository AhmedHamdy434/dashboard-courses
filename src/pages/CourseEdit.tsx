import { useParams } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import NotFound from "./NotFound";

import AddAndEdit from "../components/AddAndEdit";

const CourseEdit = () => {
  const { courseName } = useParams();
  const context = useCourses();
  if (!context) return;

  const { courses } = context;
  const course = courses.find((cor) => cor.name === courseName);
  if (!course) return <NotFound />;

  return <AddAndEdit courseName={courseName} isNew={false} />;
};

export default CourseEdit;
