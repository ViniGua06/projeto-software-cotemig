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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p><br></br>
            <button id="btn-wel">Saiba mais</button>
          </div>
          <div className="img-wel">
            <img src={Angel} alt="angel" />
          </div>
        </div>
      </main>
    </>
  );
};
