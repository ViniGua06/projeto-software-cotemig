import "../styles/home.css";
import angel from "../assets/angel.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";

const Angel = angel;
export const HomeMain = () => {
  const { isLogged } = useSelector(userSelect);
  return (
    <>
      <main>
        <div className="containerHome">
          <div className="text-wel">
            <h3 id="welcome-part2">
              Esteja por dentro da<br></br> sua igreja!
            </h3>
            <p id="paragrafh-welcome">
              Nossa plataforma digital facilita as operações administrativas e
              de comunicação, proporcionando uma experiência integrada e
              eficiente para líderes religiosos e membros da comunidade.
            </p>
            <br></br>
            {isLogged ? (
              <Link to={"/user"}>
                <button id="btn-wel">Minha Página</button>
              </Link>
            ) : (
              <Link to={"/signUp"}>
                <button id="btn-wel">Crie sua conta</button>
              </Link>
            )}
          </div>
          <div className="img-wel">
            <img src={Angel} alt="angel" />
          </div>
        </div>
      </main>
    </>
  );
};
