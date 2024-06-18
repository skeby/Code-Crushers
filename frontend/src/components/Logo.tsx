import { useAppSelector } from "@/state/store";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

interface Props {
  className?: string;
  size?: "sm" | "lg";
}
const Logo = ({ className, size = "sm" }: Props) => {
  const { hasStarted, hasFinished } = useAppSelector((state) => state.ui);
  return (
    <Link to={!(hasStarted && !hasFinished) ? "/" : "#"} className={className}>
      <img
        src={logo}
        alt=""
        className={
          size === "sm" ? "max-w-10 max-h-[30px]" : "max-w-20 max-h-[60px]"
        }
      />
    </Link>
  );
};

export default Logo;
