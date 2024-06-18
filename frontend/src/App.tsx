import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "./state/store";
import { apiCall } from "./services";
import { paths } from "./services/static";
import { useEffect } from "react";
import { setRefetchUser, setUser } from "./state/slices/authSlice";
import ScreenLoader from "./components/ScreenLoader";

const App = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [user?.id, user?.role],
    queryFn: () =>
      apiCall(
        {},
        user?.role === "teacher"
          ? `${paths.teacher.getTeacherById}/${user?.id}`
          : `${paths.student.getStudentById}/${user?.id}`,
        "get"
      ),
    enabled: false,
  });

  useEffect(() => {
    if (!user) return;
    console.log(data);
    if (data?.role?.toLowerCase() === "student") {
      const {
        _id,
        firstName,
        lastName,
        email,
        role,
        registeredCourses,
        takenExams,
      } = data;
      dispatch(
        setUser({
          id: _id,
          firstName,
          lastName,
          email,
          role: role.toLowerCase(),
          registeredCourses,
          takenExams,
        })
      );
    } else if (data?.role?.toLowerCase() === "teacher") {
      const {
        _id,
        firstName,
        lastName,
        email,
        role,
        department,
        createdExams,
      } = data;
      dispatch(
        setUser({
          id: _id,
          firstName,
          lastName,
          email,
          role: role.toLowerCase(),
          department,
          createdExams,
        })
      );
    }
  }, [data]);

  useEffect(() => {
    dispatch(setRefetchUser(refetch));
  }, []);

  return (
    <>
      <ScreenLoader loading={isFetching || isLoading} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
