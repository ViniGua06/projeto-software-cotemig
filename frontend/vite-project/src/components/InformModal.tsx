import styled from "styled-components";

import "../styles/home.css";

const BackgroundModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8rem 29rem;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
`;

export const InformModal = () => {
  return (
    <>
      <BackgroundModal>
        <ModalContainer></ModalContainer>
      </BackgroundModal>
    </>
  );
};
