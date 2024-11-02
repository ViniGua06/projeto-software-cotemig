import "../styles/home.css";
import angel from "../assets/angel.png";

const Angel = angel;
export const HomeMain = () => {
  return (
    <>
      <main>
        <div className="containerHome">
          <div className="text-wel">
            <h3 id="welcome-part2">
              Esteja por dentro da<br></br> sua igreja!
            </h3>
            <p id="paragrafh-welcome"> 
              Nossa plataforma digital facilita as operações administrativas e de comunicação, proporcionando uma 
              experiência integrada e eficiente para líderes religiosos e membros da comunidade.
            </p><br></br>
            <button id="btn-wel"><a href="/signUp">Crie sua conta</a></button>
          </div>
          <div className="img-wel">
            <img src={Angel} alt="angel" />
          </div>
        </div>
      </main>
    </>
  );
};
