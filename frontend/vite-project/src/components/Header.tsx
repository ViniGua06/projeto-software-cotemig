import { Link, useNavigate } from "react-router-dom";
import MenuHamb from "../sub-components/MenuHamb";
import ResponsiveNav from "../components/ResponsiveNav";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import { ProphilePhoto } from "./ProphilePhoto";
import { Gear } from "../sub-components/Gear";

const Header = () => {
  const { isLogged, user_pfp } = useSelector(userSelect);
  const navigate = useNavigate();

  const redirect = () => {
    if (isLogged) {
      navigate("/user");
    } else {
      navigate("/signIn");
    }
  };

  return (
    <>
      <header>
        <Link to="/" id="achei">
          E-Church
        </Link>
        <ul>
          <li>
            <Link to="/churches">Igrejas Afiliadas</Link>
          </li>
          <li>
            <a onClick={redirect}>Página do Fiel</a>
          </li>
          <li>
            <Link to="/contact">Nos contate</Link>
          </li>
        </ul>

        {isLogged ? (
          <>
            <Gear></Gear>
          </>
        ) : null}

        <MenuHamb id="hamb" id_element="two"></MenuHamb>
      </header>
      <ResponsiveNav></ResponsiveNav>
    </>
  );
};

export default Header;
