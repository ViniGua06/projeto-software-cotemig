import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import "../styles/userpage.css";

import { userSelect } from "../redux/user/slice";
import { modalSelect } from "../redux/modal/slice";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/user/slice";

import { Modal } from "../components/Modal";
import { ativar } from "../redux/modal/slice";
import { ProphilePhoto } from "../components/ProphilePhoto";
import { ChangePfpForm } from "../components/Form/ChangePfpForm";

import ApiService from "../services/Api.service";
import { ChurchesTab } from "../components/ChurchesTab";
import { UpdateUserForm } from "../components/Form/UpdateUserForm";

const UserPage = () => {
  const { user_name } = useSelector(userSelect);

  const api = ApiService();

  const { ativo } = useSelector(modalSelect);

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

  const goToEnterChurchPage = () => {
    navigate("/enterchurch");
  };

  const { tipo } = useSelector(modalSelect);

  return (
    <>
      <Header></Header>

      <div id="MainUserPage">
        <div id="FirstSection">
          <div>
            <ProphilePhoto
              margin="0 0 2rem 0"
              onClick={() => {
                dispatch(ativar("Trocar Imagem"));
              }}
            ></ProphilePhoto>
            <h1>Ola, {user_name.toUpperCase()}</h1>
          </div>

          <div>
            <ChurchesTab></ChurchesTab>
            <button
              className="CadastrarChurchButton"
              onClick={goToCreateChurch}
            >
              <svg
                id="enter"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              <svg
                id="enter"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M224 109.3V217.6L183.3 242c-14.5 8.7-23.3 24.3-23.3 41.2V512h96V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96h96V283.2c0-16.9-8.8-32.5-23.3-41.2L416 217.6V109.3c0-8.5-3.4-16.6-9.4-22.6L331.3 11.3c-6.2-6.2-16.4-6.2-22.6 0L233.4 86.6c-6 6-9.4 14.1-9.4 22.6zM24.9 330.3C9.5 338.8 0 354.9 0 372.4V464c0 26.5 21.5 48 48 48h80V273.6L24.9 330.3zM592 512c26.5 0 48-21.5 48-48V372.4c0-17.5-9.5-33.6-24.9-42.1L512 273.6V512h80z" />
              </svg>
            </button>
            <button className="EnterChurchButton" onClick={goToEnterChurchPage}>
              <svg
                id="enter"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
              <svg
                id="enter"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M224 109.3V217.6L183.3 242c-14.5 8.7-23.3 24.3-23.3 41.2V512h96V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96h96V283.2c0-16.9-8.8-32.5-23.3-41.2L416 217.6V109.3c0-8.5-3.4-16.6-9.4-22.6L331.3 11.3c-6.2-6.2-16.4-6.2-22.6 0L233.4 86.6c-6 6-9.4 14.1-9.4 22.6zM24.9 330.3C9.5 338.8 0 354.9 0 372.4V464c0 26.5 21.5 48 48 48h80V273.6L24.9 330.3zM592 512c26.5 0 48-21.5 48-48V372.4c0-17.5-9.5-33.6-24.9-42.1L512 273.6V512h80z" />
              </svg>
            </button>
            <button className="SairButton" onClick={deslogar}>
              <svg
                id="logout"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {tipo == "Trocar Imagem" ? (
        <>
          <Modal title="Trocar Imagem de Perfil">
            <ChangePfpForm />
          </Modal>
        </>
      ) : tipo == "Editar Perfil" ? (
        <>
          <Modal title="Editar Perfil">
            <UpdateUserForm></UpdateUserForm>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default UserPage;
