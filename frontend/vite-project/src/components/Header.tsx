import { Link, useNavigate } from "react-router-dom";
import MenuHamb from "../sub-components/MenuHamb";
import ResponsiveNav from "../components/ResponsiveNav";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import { Gear } from "../sub-components/Gear";
import { DropDown } from "../sub-components/DropDown";
import { useState } from "react";
import icon from "../assets/sistema_paroquias.svg";

const Icon = icon;

const Header = () => {
  const { isLogged } = useSelector(userSelect);
  const navigate = useNavigate();

  const redirect = () => {
    if (isLogged) {
      navigate("/user");
    } else {
      navigate("/signIn");
    }
  };

  const [drop, setDrop] = useState(false);

  return (
    <>
      <header>
        <ul>
          <li>
            <a onClick={redirect}>Página do Fiel</a>
          </li>
          <Link to="/" id="achei">
            <img
              src={Icon}
              width={"70px"}
              alt=""
            />
          </Link>
          <li>
            <Link to="/contact">Contate-nos</Link>
          </li>
        </ul>

        <MenuHamb id="hamb" id_element="two"></MenuHamb>
      </header>
      <ResponsiveNav></ResponsiveNav>
    </>
  );
};

export default Header;
