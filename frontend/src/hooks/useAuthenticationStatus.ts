import { useEffect } from "react";
import { useAppSelector } from "../state/store";
import { useNavigate } from "react-router-dom";

interface Props {
  pageType: "protected" | "public";
}

const useAuthenticationStatus = ({ pageType }: Props) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && pageType === "public") {
      navigate("/", { replace: true });
    } else if (!isAuthenticated && pageType === "protected") {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);
};

export default useAuthenticationStatus;
