import { useState } from "react";
import styled from "styled-components";

interface IModal {
  modalAtivo: boolean;
}

const BackgroundModal = styled.div<IModal>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.modalAtivo ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  padding: 21rem;
`;

const ContentModal = styled.div<IModal>`
  display: ${(props) => (props.modalAtivo ? "flex" : "none")};
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  justify-content: center;
  align-items: center;
`;

export const Modal = () => {
  const [ativo, setAtivo] = useState(false);
  return (
    <>
      <button onClick={() => setAtivo(true)}>Ativar</button>
      <BackgroundModal modalAtivo={ativo}>
        <ContentModal modalAtivo={ativo}>
          <button onClick={() => setAtivo(false)}>Voltar</button>
        </ContentModal>
      </BackgroundModal>
    </>
  );
};
