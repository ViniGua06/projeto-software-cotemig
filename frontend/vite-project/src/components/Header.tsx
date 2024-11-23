import { Link, useNavigate } from "react-router-dom";
import MenuHamb from "../sub-components/MenuHamb";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import { useState } from "react";
import icon from "../assets/sistema_paroquias.svg"
import "../styles/home.css"

const Icon = icon;
interface HeaderProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Header = ({ toggleMenu, isMenuOpen }: HeaderProps) => {
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
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={Icon} width="70px" alt="Ícone" />
          </Link>
          {isLogged ? (
            <ul className={`header-links ${isMenuOpen ? "open" : ""}`}>
              <li>
                <Link to="/userevents" className="headerLink">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/usersettings" className="headerLink">
                  Configurações
                </Link>
              </li>
              <li>
                <Link to="/user" className="headerLink">
                  Minha Página
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
        <button id="hamb" onClick={toggleMenu}>
          &#9776; {}
        </button>
      </header>
    </>
  );
};

export default Header;
