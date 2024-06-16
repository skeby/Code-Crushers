import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/state/store";
import { useNavigate } from "react-router-dom";

interface StudentRouteProps {
  children: ReactNode;
}

const StudentRoute = ({ children }: StudentRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const isStudent = user?.role === "Student";

  useEffect(() => {
    if (!isStudent) {
      navigate("/", { replace: true });
    }
  }, [navigate, isStudent]);

  return isStudent ? children : null;
};

export default StudentRoute;
