import styled from "styled-components";

import "../styles/home.css";
import { useDispatch } from "react-redux";

import { ativar, desativar } from "../redux/modal/slice";
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
          <h1 style={{ color: "#0460a0" }}>Sessão Expirada!</h1>
          <img src={illustrate} width={"480px"} height={"480px"} />
          <h1
            style={{ color: "#0460a0", cursor: "pointer" }}
            onClick={() => goToSignIn()}
          >
            Login
          </h1>
        </ModalContainer>
      </BackgroundModal>
    </>
  );
};
