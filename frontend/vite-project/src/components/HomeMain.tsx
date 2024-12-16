import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import icon from ".././assets/sistema_paroquias.svg";
import styled from "styled-components";

const Icon = icon;
export const HomeMain = () => {
  const { isLogged } = useSelector(userSelect);
  return (
    <>
        <ContainerHome>
          <WelcomeTextContainer>
            <WelcomeTitle>
              Esteja por dentro da<br></br> sua igreja!
            </WelcomeTitle>
            <WelcomeParagraph>
              Simplifique a administração e a comunicação da sua comunidade com
              nossa plataforma digital, eficiente e intuitiva.
            </WelcomeParagraph>
            <br></br>
            {isLogged ? (
              <LoggedBtn></LoggedBtn>
            ) : (
              <Link to={"/signUp"}>
                <WelcomeButton>Crie sua conta</WelcomeButton>
              </Link>
            )}
          </WelcomeTextContainer>
          <WelcomeImage>
            <img src={Icon} alt="Ícone" />
          </WelcomeImage>
        </ContainerHome>
      <Footer>
        <p>E-Church©2024</p>
      </Footer>
    </>
  );
};

const ContainerHome = styled.div`
  display: flex;
  padding-top: 7em;
  height: auto;
  padding-inline: 5em;
  align-items: center;
  background-color: #fff;
  color: #0460a0;
  justify-content: space-evenly;
  min-height: 65vh;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const WelcomeTextContainer = styled.div`
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-select: none;
`;

const WelcomeTitle = styled.h3`
  font-size: 5vh;
  padding-top: 3rem;
`;

const WelcomeParagraph = styled.p`
  padding-top: 2rem;
  line-height: 2rem;
  max-width: 50rem;
  text-align: justify;
  font-size: 1.5rem;
`;

const WelcomeImage = styled.div`
  display: grid;
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-select: none;
  pointer-events: none;
  margin-bottom: 0rem;
`;

const WelcomeButton = styled.button`
  border-radius: 6px;
  width: 211px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  height: 50px;
  background-color: #0460a0;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #054d85;
  }
`;

const LoggedBtn = styled.button`
  visibility: hidden;
`;

const Footer = styled.footer`
  background-color: #0460a0;
  color: white;
  text-align: center;
  padding: 1.56rem 0;
  margin-top: 10.5rem;
  & p {
  margin: 0;
  font-size: 1.2rem;
  font-family: 'Montserrat';
  cursor: not-allowed;
  user-select: none;
  }
`;