import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/state/store";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  //testing purposes //Note: Do this from redux authSlice instead, line 17
  // const isAuthenticated = true;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate, isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
