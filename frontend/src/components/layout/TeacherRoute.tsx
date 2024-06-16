import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/state/store";
import { useNavigate } from "react-router-dom";

interface TeacherRouteProps {
  children: ReactNode;
}

const TeacherRoute = ({ children }: TeacherRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const isTeacher = user?.role === "Teacher";

  useEffect(() => {
    if (!isTeacher) {
      navigate("/", { replace: true });
    }
  }, [navigate, isTeacher]);

  return isTeacher ? children : null;
};

export default TeacherRoute;
