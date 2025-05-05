import { createContext, useState, useContext, useEffect } from "react";
import { CourseType, initialCources } from "../data/data";

const CourseContext = createContext<
  | {
      courses: CourseType[];
      setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
    }
  | undefined
>(undefined);
export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const coursesString = localStorage.getItem("courses");
    if (coursesString) {
      const coursesFromLocalStorage: CourseType[] = JSON.parse(coursesString);
      setCourses(coursesFromLocalStorage);
    } else {
      setCourses(initialCources);
      localStorage.setItem("courses", JSON.stringify(initialCources));
    }
  }, []);

  return (
    <CourseContext.Provider value={{ courses, setCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useCourses = () => useContext(CourseContext);
