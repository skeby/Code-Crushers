import { Link } from "react-router-dom";

interface Props {
  className?: string;
}
const Logo = ({ className }: Props) => {
  return (
    <Link to={"/"} className={className ?? "text-sm sm:text-2xl"}>
      Logo
    </Link>
  );
};

export default Logo;
