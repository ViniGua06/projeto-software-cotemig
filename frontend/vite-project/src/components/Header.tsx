import { Link, useNavigate } from "react-router-dom";
import MenuHamb from "../sub-components/MenuHamb";
import ResponsiveNav from "../components/ResponsiveNav";
import { useSelector } from "react-redux";
import { select } from "../redux/user/slice";
import { ProphilePhoto } from "./ProphilePhoto";

const Header = () => {
  const { isLogged, user_pfp } = useSelector(select);
  const navigate = useNavigate();

  const goToUser = () => {
    navigate("/user");
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
            <Link to="/sign">Cadastrar sua Igreja</Link>
          </li>
          <li>
            <Link to="/contact">Nos contate</Link>
          </li>

          {isLogged ? (
            <>
              <ProphilePhoto
                onClick={goToUser}
                src={user_pfp}
                height="100%"
              ></ProphilePhoto>
            </>
          ) : (
            <>
              <li>
                <Link to="/signIn">Entrar</Link>
              </li>
            </>
          )}
        </ul>
        <MenuHamb id="hamb" id_element="two"></MenuHamb>
      </header>
      <ResponsiveNav></ResponsiveNav>
    </>
  );
};

export default Header;
