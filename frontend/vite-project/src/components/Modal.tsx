import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { ativar, desativar } from "../redux/modal/slice";

import { select } from "../redux/modal/slice";
import { useDispatch, useSelector } from "react-redux";

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
  height: 20%;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
  padding-inline: 2rem;
  border-bottom: solid rgba(0, 0, 0, 0.6);
`;

const MainModel = styled.div`
  height: 60%;
  width: 100%;
  padding-inline: 2rem;
  padding-block: 1rem;
  border-bottom: solid rgba(0, 0, 0, 0.6);
  overflow-y: auto;
`;

const FooterModel = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-inline: 2rem;
`;

const CloseModalX = styled.h2`
  &:hover {
    color: red;
    cursor: pointer;
  }
`;

const CloseModalButton = styled.button`
  width: 20%;
  padding-block: 0.5rem;
  background-color: whitesmoke;
  border: solid rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: green;
    border: white solid;
    color: white;
  }
`;

interface IPropsModal {
  title: string;
  children: React.ReactNode;
  submit: () => void;
}

export const Modal = (props: IPropsModal) => {
  const { ativo } = useSelector(select);
  const dispatch = useDispatch();

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
            <CloseModalX onClick={() => dispatch(desativar())}>X</CloseModalX>
          </HeaderModal>
          <MainModel>{props.children}</MainModel>
          <FooterModel>
            <CloseModalButton onClick={() => props.submit()}>
              Enviar
            </CloseModalButton>
          </FooterModel>
        </ContentModal>
      </BackgroundModal>
    </>
  );
};
