import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CourseEdit from "./pages/CourseEdit";
import CourseDetails from "./pages/CourseDetails";
import CourseNew from "./pages/CourseNew";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/new" element={<CourseNew />} />
        <Route path="/courses/edit/:courseName" element={<CourseEdit />} />
        <Route path="/courses/:courseName" element={<CourseDetails />} />
      </Routes>
    </main>
  );
}

export default App;
