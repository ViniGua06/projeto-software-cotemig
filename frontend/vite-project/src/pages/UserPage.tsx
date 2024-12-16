import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { userSelect } from "../redux/user/slice";
import { modalSelect } from "../redux/modal/slice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/user/slice";
import { Modal } from "../components/Modal";
import { ativar } from "../redux/modal/slice";
import { ProphilePhoto } from "../components/ProphilePhoto";
import { ChangePfpForm } from "../components/Form/ChangePfpForm";
import ApiService from "../services/Api.service";
import { ChurchesTab } from "../components/ChurchesTab";
import { UpdateUserForm } from "../components/Form/UpdateUserForm";
import { InformModal } from "../components/InformModal";
import { Settings } from "lucide-react";
import styled from "styled-components";



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

  const { tipo } = useSelector(modalSelect);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>

      <MainUserPage>
        <FirstSection>
          <div>
            <ProphilePhoto
              margin="1rem 0 2rem 0"
              onClick={() => {
                dispatch(ativar("Trocar Imagem"));
              }}
            ></ProphilePhoto>
            <h1 id="welcome-user">
              {" "}
              Olá, <span id="user-name">{user_name}</span>
            </h1>
            <li id="user-settings-li">
              <Link to="/usersettings">
                <Settings id="user-settings-icon" size={60} />
              </Link>
            </li>
          </div>

          <ChurchesTab></ChurchesTab>
          <br />

          <UserActionsContainer>
            <RowContainer>
              <h3>Crie uma igreja:</h3>
              <CadastrarChurchButton onClick={goToCreateChurch}>
                <svg
                  fill="#0460a0"
                  id="enter"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                <svg
                  fill="#0460a0"
                  id="enter"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M224 109.3V217.6L183.3 242c-14.5 8.7-23.3 24.3-23.3 41.2V512h96V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96h96V283.2c0-16.9-8.8-32.5-23.3-41.2L416 217.6V109.3c0-8.5-3.4-16.6-9.4-22.6L331.3 11.3c-6.2-6.2-16.4-6.2-22.6 0L233.4 86.6c-6 6-9.4 14.1-9.4 22.6zM24.9 330.3C9.5 338.8 0 354.9 0 372.4V464c0 26.5 21.5 48 48 48h80V273.6L24.9 330.3zM592 512c26.5 0 48-21.5 48-48V372.4c0-17.5-9.5-33.6-24.9-42.1L512 273.6V512h80z" />
                </svg>
              </CadastrarChurchButton>
            </RowContainer>
            <br></br>
          </UserActionsContainer>
        </FirstSection>
        <SairButton
          onClick={() => {
            if (confirm("Tem certeza que deseja sair?")) {
              deslogar();
            }
          }}
        >
          <svg
            fill="#fff"
            id="logout"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
          </svg>
        </SairButton>
      </MainUserPage>

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
      ) : tipo == "Not Allowed" ? (
        <>
          <InformModal></InformModal>
        </>
      ) : null}
    </>
  );
};

const UserActionsContainer = styled.div`

`;

const FirstSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > div {
    display: flex;
    gap: 0.5rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 2rem;
  flex-wrap: wrap;
`;

const SairButton = styled.button`
    border: none;
    color: white;
    padding: 0.75rem;
    width: 5rem;
    background-color: #0460a0;
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    border-radius: 1rem;

    &:hover {
      filter: brightness(80%);
      cursor: pointer;
    }
`;

const MainUserPage = styled.div`
  padding: 2rem;
  width: 80%;
  height: auto;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(214, 233, 251);
  border: 5px solid #0460a0;
  margin: 0 auto;
  margin-top: 2rem;
`;


const CadastrarChurchButton = styled.button`
  background-color: rgb(255, 255, 255);
  border: none;
  width: 8rem;
  height: 4rem;
  cursor: pointer;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
  filter: brightness(85%);
  }
`;

export default UserPage;
