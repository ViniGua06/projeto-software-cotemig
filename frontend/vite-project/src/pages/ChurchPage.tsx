import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { churchSelect } from "../redux/church/slice";
import { useEffect } from "react";
import ChurchService from "../services/Church.service";
import styled from "styled-components";
import igreja from "../assets/igreja.svg";
import { userSelect } from "../redux/user/slice";
import url from "../assets/urlBackend";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/Api.service";
import { ativar, desativar, modalSelect } from "../redux/modal/slice";
import { Modal } from "../components/Modal";
import { UpdateUserForm } from "../components/Form/UpdateUserForm";
import { UpdateChurchForm } from "../components/Form/UpdateChurchForm";
import { SetDailyVerseForm } from "../components/Form/SetDailyVerseForm";
import { BookOpenText, CalendarDays, Edit, Megaphone, MessageSquareText, Plus, Send } from "lucide-react";

interface IIntegrants {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}
export const ChurchPage = () => {
  const {
    church_name,
    church_code,
    church_photo,
    integrants,
    church_id,
    role,
  } = useSelector(churchSelect);

  const { tipo } = useSelector(modalSelect);

  const apiService = ApiService();

  const dispatch = useDispatch();

  const { user_id, token } = useSelector(userSelect);

  const churchService = ChurchService();

  const navigate = useNavigate();

  const getInfo = async () => {
    await churchService.changeChurchService(church_id);
  };

  const remove = async (user_id: number) => {
    try {
      const response = await fetch(
        `${url}/integrant/${user_id}/church/${church_id}`,
        {
          method: "DELETE",
          headers: {
            "x-acess-token": token,
          },
        }
      );

      const data = await response.json();

      alert(data.message);

      getInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const goToChat = () => {
    navigate("/church/chat");
  };

  const goToNotices = () => {
    navigate("/church/notices");
  };

  const goToMembers = () => {
    navigate("/church/members")
  }

  const goToCreateNotice = () => {
    dispatch(ativar("Criar Aviso"));
  };

  useEffect(() => {
    apiService.fetchUserInfo();
    apiService.testToken();

    getInfo();
  }, []);

  const [text, setText] = useState("");

  const createNotice = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const res = await fetch(`${url}/notice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          user_id: user_id,
          church_id: church_id,
        }),
      });

      if (res.status == 201) {
        alert("Aviso criado com sucesso");
        dispatch(desativar());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editar = () => {
    dispatch(ativar("Mudar Permissões"));
  };

  const [roleUpds, setRoleUpds] = useState("");
  const [id, setId] = useState(0);

  const changePermission = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const res = await fetch(`${url}/integrantrole`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          church_id: church_id,
          user_id: id,
          role: roleUpds,
        }),
      });

      const data = await res.json();

      if (res.status == 200) {
        dispatch(desativar());
        apiService.fetchUserInfo();
        churchService.changeChurchService(church_id);

        getInfo();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [photoSrcs, setPhotoSrcs] = useState(integrants?.map(() => "") || []);

  const goToUpdateChurchForm = () => {
    dispatch(ativar("Update Church"));
  };

  const goToBiblePage = () => {
    navigate("/church/bible");
  };

  const [dailyVerse, setDailyVerse] = useState("");

  const getDailyVerse = async () => {
    try {
      const res = await fetch(`${url}/church/${church_id}/verse`);
      const data = await res.json();

      if (res.status == 200) setDailyVerse(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDailyVerse();
  }, []);

  const invitePerson = async () => {
    const res = await fetch(`${url}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        church_id: church_id,
      }),
    });

    const data = await res.json();

    const tokenToRoute = data;
    const inviteLink = `http://www.localhost:5173/invite/${tokenToRoute}`;
    const message = `Se junte a ${church_name} ${inviteLink}`;

    window.open(
      `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <div id="MainChurchPage">
        <Main>
          <h1>{church_name}</h1>
          <ChurchPhoto src={church_photo || igreja}></ChurchPhoto>
          <h1 style={{ marginTop: "1rem" }}>{dailyVerse}</h1>
          <ButtonP onClick={goToMembers}>Gerenciar Membros</ButtonP>
          <ButtonContainer>
            <Button onClick={goToChat}>
              <MessageSquareText /> CHAT
            </Button>
            <Button onClick={goToNotices}>
              <Megaphone /> AVISOS
            </Button>
            {role == "admin" ? (
              <>
                <Button onClick={goToCreateNotice}>
                  {" "}
                  <Plus />
                  Criar Aviso
                </Button>
                <Button onClick={goToUpdateChurchForm}>
                  <Edit />
                  Editar Igreja
                </Button>
                <Button onClick={() => dispatch(ativar("Setar Versículo"))}>
                  <Plus />
                  Versículo do dia
                </Button>
                <Button onClick={invitePerson}>
                  <Send />
                  Convidar membro
                </Button>
              </>
            ) : null}
          </ButtonContainer>
          {tipo == "Criar Aviso" ? (
            <>
              <Modal title="Criar Aviso">
                <Form onSubmit={createNotice}>
                  <label>Aviso</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit">Enviar</button>
                </Form>
              </Modal>
            </>
          ) : tipo == "Mudar Permissões" ? (
            <>
              <Modal title="Mudar Permissões">
                <form onSubmit={changePermission}>
                  <Select
                    value={roleUpds}
                    onChange={(e) => setRoleUpds(e.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="admin">Admin</option>
                    <option value="normal">Normal</option>
                  </Select>

                  <PermitSubmit type="submit">Enviar</PermitSubmit>
                </form>
              </Modal>
            </>
          ) : tipo == "Editar Perfil" ? (
            <>
              <Modal title={"Editar Perfil"}>
                <UpdateUserForm></UpdateUserForm>
              </Modal>
            </>
          ) : tipo == "Update Church" ? (
            <>
              <Modal title="Atualizar igreja">
                <UpdateChurchForm></UpdateChurchForm>
              </Modal>
            </>
          ) : tipo == "Setar Versículo" ? (
            <>
              <Modal title="Atualizar versículo do dia">
                <SetDailyVerseForm></SetDailyVerseForm>
              </Modal>
            </>
          ) : null}
        </Main>
      </div>
    </>
  );
};

const ButtonP = styled.button`
  border-radius: 1rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  color: #fff;
  font-size: 1.4rem;
  background: #0460a0;
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;

  &:hover {
    filter: brightness(80%);
  }
`;

const Button = styled.button`
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  font-size: 15px;
  cursor: pointer;
  font-weight: 900;
  text-transform: uppercase;

  &:hover {
    filter: brightness(80%);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
`;

const PermitSubmit = styled.button`
  padding: 0.6rem;
`;

const Select = styled.select`
  outline: none;
  padding: 0.5rem;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  & > label {
    color: black;
  }

  & > textarea {
    outline: none;
    padding: 1rem;
    max-width: 60%;
    min-width: 60%;
  }

  & > button {
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
  }
`;

const ChurchPhoto = styled.img`
  margin-top: 1rem;
  border-radius: 50%;
  height: 120px;
  margin-right: 0.1rem;
  width: 120px;
`;

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  overflow: auto;
`;