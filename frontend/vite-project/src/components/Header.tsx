import { Link, useNavigate } from "react-router-dom";
import MenuHamb from "../sub-components/MenuHamb";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import { useState } from "react";
import icon from "../assets/sistema_paroquias.svg"
import "../styles/home.css"

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
        {isLogged ? <ul>
          <li className="headerList">
            <Link to={"/usersettings"} id="userPage-header">Página do usuário</Link>
          </li>
        </ul>: null}
        <Link to="/">
          <img src={Icon} width={"70px"} alt="" />
        </Link>
        <MenuHamb id="hamb" id_element="two"></MenuHamb>
      </header>
    </>
  );
};

export default Header;
