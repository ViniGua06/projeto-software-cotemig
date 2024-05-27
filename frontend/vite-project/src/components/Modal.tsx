import { useEffect} from "react";
import styled, { keyframes } from "styled-components";

// import { ativar, desativar } from "../redux/modal/slice";

import { select } from "../redux/modal/slice";
import {useSelector } from "react-redux";

import { ButtonCloseSvg } from "../assets/ButtonCloseSvg";

interface IModal {
  modalAtivo: boolean;
}

const ModalAnimation = keyframes`
  0% {
    transform: translateY(0)
  } 50% {
    transform: translateY(40px)
  } 100% {
    transform: translateY(0px)
  }
`;

const BackgroundModal = styled.div<IModal>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100%;
  display: ${(props) => (props.modalAtivo ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  padding-inline: 19rem;
  padding-block: 2rem;
`;

const ContentModal = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.3s linear;
`;

const HeaderModal = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
  padding-inline: 2rem;
  border-bottom: solid rgba(0, 0, 0, 0.6);
`;

const MainModel = styled.div`
  height: 90%;
  width: 100%;
  padding-inline: 2rem;
  padding-block: 1rem;
  border-bottom: solid rgba(0, 0, 0, 0.6);
  overflow-y: auto;
`;

const CloseModalX = styled.h2`
  height: 50%;

  &:hover {
    cursor: pointer;
    transform: scale(0.8);
  }
`;

interface IPropsModal {
  title: string;
  children: React.ReactNode;
  closeModal?: () => void;
}

export const Modal = (props: IPropsModal) => {
  const { ativo } = useSelector(select);

  useEffect(() => {
    if (ativo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ativo]);
  return (
    <>
      <BackgroundModal modalAtivo={ativo}>
        <ContentModal>
          <HeaderModal>
            <h1>{props.title}</h1>
            <CloseModalX>
              <ButtonCloseSvg></ButtonCloseSvg>
            </CloseModalX>
          </HeaderModal>
          <MainModel>{props.children}</MainModel>
        </ContentModal>
      </BackgroundModal>
    </>
  );
};
