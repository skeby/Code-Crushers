import { useAppSelector } from "@/state/store";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}
const Logo = ({ className }: Props) => {
  const { hasStarted, hasFinished } = useAppSelector((state) => state.ui);
  return (
    <Link
      to={!(hasStarted && !hasFinished) ? "/" : "#"}
      className={className ?? "text-sm"}
    >
      Grade AI
    </Link>
  );
};

export default Logo;
