import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

import { userSelect } from "../redux/user/slice";
import { modalSelect } from "../redux/modal/slice";

import url from "../assets/urlBackend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout, changeUser, fetchUser } from "../redux/user/slice";

import axios from "axios";

import u_defult from "../assets/user_default.png";
import { Modal } from "../components/Modal";
import { ativar } from "../redux/modal/slice";
import { ProphilePhoto } from "../components/ProphilePhoto";
import { ChangePfpForm } from "../components/Form/ChangePfpForm";

import ApiService from "../services/Api.service";
import { ChurchesTab } from "../components/ChurchesTab";
import styled from "styled-components";

const UserPage = () => {
  const {
    token,
    isLogged,
    user_id,
    user_email,
    user_name,
    user_password,
    user_pfp,
  } = useSelector(userSelect);

  const api = ApiService();

  const { ativo } = useSelector(modalSelect);

  const [imagem, setImagem] = useState("");

  const [id, setId] = useState(user_id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    api.fetchUserInfo();
    api.testToken();
  }, [ativo]);

  const deslogar = () => {
    navigate("/signIn");
    dispatch(logout());
  };

  const goToCreateChurch = () => {
    navigate("/church/create");
  };

  const [modal, setModal] = useState<string>("");

  return (
    <>
      <Header></Header>

      <MainUserPage>
        <FirstSection>
          <div>
            <ProphilePhoto
              margin="0 0 2rem 0"
              onClick={() => {
                setModal("Trocar Imagem");
                dispatch(ativar());
              }}
            ></ProphilePhoto>
            <h1
              onClick={() => {
                setModal("Editar Perfil");
                dispatch(ativar());
              }}
            >
              Ola, {user_name.toUpperCase()}
            </h1>
          </div>

          <div>
            <ChurchesTab></ChurchesTab>
            <CadastrarChurchButton onClick={goToCreateChurch}>
              Cadastrar Igreja
            </CadastrarChurchButton>
            <EnterChurchButton>Ingressar numa Instituição</EnterChurchButton>
            <SairButton onClick={deslogar}>Sair</SairButton>
          </div>
        </FirstSection>
      </MainUserPage>

      {modal == "Trocar Imagem" ? (
        <>
          <Modal title="Trocar Imagem de Perfil">
            <ChangePfpForm />
          </Modal>
        </>
      ) : modal == "Editar Perfil" ? (
        <>
          <Modal title="Editar Perfil">
            <h1>ola</h1>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default UserPage;

const SairButton = styled.button`
  background-color: rgb(211, 47, 47);
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  border-radius: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: red;
    cursor: pointer;
  }
`;

const MainUserPage = styled.main`
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const FirstSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const CadastrarChurchButton = styled.button`
  background-color: rgb(76, 175, 80);
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  border-radius: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: green;
    cursor: pointer;
  }
`;

const EnterChurchButton = styled.button`
  background-color: rgb(33, 150, 243);
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  border-radius: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: blue;
    cursor: pointer;
  }
`;
