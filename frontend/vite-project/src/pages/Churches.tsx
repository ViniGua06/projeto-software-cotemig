import Header from "../components/Header";
import "../styles/churchesList.css";

const Churches = () => {
  return (
    <>
      <Header />
      <div className="containerCards">
          <ul >
            <li className="cardChurch">
              <h3>Church Name</h3>
              <p>
                Description Description Description Description Description
                Description Description Description Description Description
                Description Description Description Description Description
              </p>
              <img src="" alt=""></img>
            </li>
            <li className="cardChurch">
            <h3>Church Name</h3>
              <p>
                Description Description Description Description Description
                Description Description Description Description Description
                Description Description Description Description Description
              </p>
              <img src="" alt=""></img>
            </li>
          </ul>
      </div>
    </>
  );
};

export default Churches;
