import Header from "../components/Header";
import url from "../assets/urlBackend";
import { userSelect } from "../redux/user/slice";
import { ativar, modalSelect } from "../redux/modal/slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/slice";
import { Modal } from "../components/Modal";
import { UpdateUserForm } from "../components/Form/UpdateUserForm";
import { Settings, Undo2, UserRoundMinus } from "lucide-react";
import styled from "styled-components";

const UserSettings = () => {
  const deslogar = () => {
    navigate("/signIn");
    dispatch(logout());
  };

  useSelector(modalSelect);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user_id } = useSelector(userSelect);

  const deleteAccount = async () => {
    try {
      const res = await fetch(`${url}/user/${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (res.status == 200) {
        alert("Conta excluída!");
        deslogar();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Return
        onClick={() => {
          navigate("/user");
        }}
      >
        <Undo2 size={50}></Undo2>
      </Return>
      <Container>
        <FormArea>
          <Title>CONFIGURAÇÕES</Title>
          <br></br>
          <FormGroup>
            <EditProfile onClick={() => dispatch(ativar("Editar"))}>
              <Settings></Settings> Editar Perfil
            </EditProfile>
            <Modal title="Editar Perfil">
              <UpdateUserForm />
            </Modal>
            <EndAccount
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir sua conta?")) {
                  if (confirm("Absoluta?")) {
                    deleteAccount();
                    navigate("/user");
                  }
                }
              }}
            >
              <UserRoundMinus></UserRoundMinus>
              EXCLUIR CONTA
            </EndAccount>
          </FormGroup>
        </FormArea>
      </Container>
    </>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const EditProfile = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border-radius: 0.4rem;
  cursor: pointer;
  padding-block: 1rem;
  background-color: rgb(255, 255, 255);
  color: black;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Montserrat";
  text-transform: uppercase;

  &:hover {
    filter: brightness(70%);
  }
`;

const EndAccount = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border-radius: 0.4rem;
  cursor: pointer;
  padding-block: 1rem;
  background-color: rgb(255, 0, 0);
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 700;
  font-family: "Montserrat";
  text-transform: uppercase;
  padding: 10px;

  &:hover {
    filter: brightness(70%);
  }
`;

const Title = styled.p`
  color: #000000;
  text-decoration: underline;
  margin-bottom: 1rem;
  font-weight: 900;
  font-size: 1.5em;
  user-select: none;
  margin-top: 20px;
`;

const FormArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #e7edff;
  height: 60%;
  width: 50%;
  border: 5px solid #0460a0;
  border-radius: 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & a:hover {
    text-decoration: underline;
  }
`;

const Return = styled.button`
  color: #000000;
  background-color: transparent;
  border-radius: 0.3rem;
  position: fixed;
  left: 1rem;
  top: 5.5rem;
  cursor: pointer;

  &:hover {
    filter: brightness(50%);
  }
`;

export default UserSettings;
