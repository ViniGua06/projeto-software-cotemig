import styled from "styled-components";

import "../styles/home.css";
import { useDispatch } from "react-redux";

import { desativar } from "../redux/modal/slice";
import { useNavigate } from "react-router-dom";

import illustrate from "../assets/illustrate.jpg";

const BackgroundModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8rem 29rem;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Image = styled.img`
width: 480px;
height: 480px;
`;

const H1 = styled.h1`
  color: "#0460a0";
`;

const H1Sign = styled.h1`
color: "#0460a0"; 
cursor: pointer;
`;

export const InformModal = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToSignIn = () => {
    dispatch(desativar());
    navigate("/signIn");
  };

  return (
    <>
      <BackgroundModal>
        <ModalContainer>
          <H1>Sessão Expirada!</H1>
          <Image src={illustrate} />
          <H1Sign
            onClick={() => goToSignIn()}
          >
            Login
          </H1Sign>
        </ModalContainer>
      </BackgroundModal>
    </>
  );
};
