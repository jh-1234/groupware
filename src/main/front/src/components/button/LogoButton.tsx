import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export default function LogoButton() {
  return (
    <Link to={"/"} className="flex items-center">
      <img className="h-12 w-24" src={logo} />
    </Link>
  );
}
