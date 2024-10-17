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

import default_ from "../assets/images.png";
import ApiService from "../services/Api.service";
import { ativar, desativar, modalSelect } from "../redux/modal/slice";
import { Modal } from "../components/Modal";
import { UpdateUserForm } from "../components/Form/UpdateUserForm";
import { UpdateChurchForm } from "../components/Form/UpdateChurchForm";
import { SetDailyVerseForm } from "../components/Form/SetDailyVerseForm";

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

  const goToCreateEvent = () => {
    navigate("/user/events/create");
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
    window.open(
      `https://web.whatsapp.com/send?text=${encodeURIComponent(
        `Se junte a ${church_name}`
      )}%20${encodeURIComponent("http://localhost:5173/invite")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Header></Header>
      <Main>
        <h1>{church_name}</h1>
        <ChurchPhoto src={church_photo || igreja}></ChurchPhoto>
        <h1 style={{ marginTop: "1rem" }}>{dailyVerse}</h1>
        <Table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Permissão</th>
              {role == "admin" ? (
                <>
                  <th>Editar</th>
                  <th>Remover</th>
                </>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {integrants && integrants?.length > 0 ? (
              integrants.map((item: IIntegrants, index: number) => {
                const handleImageError = () => {
                  setPhotoSrcs((prevPhotoSrcs) => {
                    prevPhotoSrcs[index] = default_;
                    return [...prevPhotoSrcs];
                  });
                };
                return (
                  <>
                    <tr key={item.id}>
                      <td>
                        <img
                          src={photoSrcs[index] || item.photo}
                          alt="imagem"
                          height={"60px"}
                          width={"60px"}
                          style={{ borderRadius: "50%" }}
                          onError={handleImageError}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.role}</td>
                      {role == "admin" ? (
                        <>
                          {user_id != item.id ? (
                            <>
                              <RemoveTd
                                onClick={() => {
                                  editar();
                                  setId(parseInt(item.id));
                                }}
                              >
                                Editar
                              </RemoveTd>
                              <RemoveTd
                                onClick={() => remove(parseInt(item.id))}
                              >
                                Remover
                              </RemoveTd>
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </tr>
                  </>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>Nenhum integrante encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>

        <ButtonContainer>
          <Button className="btn-under" onClick={goToChat}>
            Chat
          </Button>
          <Button className="btn-under" onClick={goToBiblePage}>
            Bíblia Digital
          </Button>
          <Button className="btn-under" onClick={goToNotices}>
            Avisos
          </Button>
          {role == "admin" ? (
            <>
              <Button className="btn-under" onClick={goToCreateEvent}>
                Criar Evento
              </Button>

              <Button onClick={goToCreateNotice}>Criar Aviso</Button>
              <Button onClick={goToUpdateChurchForm}>Editar Igreja</Button>
              <Button onClick={() => dispatch(ativar("Setar Versículo"))}>
                Colocar versículo do dia
              </Button>
              <Button onClick={invitePerson}>Convidar membro</Button>
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
    </>
  );
};

const Button = styled.button`
  border-radius: 1rem;
  padding: 1rem;
  width: fit-content;
  height: 3rem;
  font-size: 15px;
  cursor: pointer;
  font-weight: 900;
  text-transform: uppercase;

  &:hover {
    background: lightgrey;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 1.5rem;
  gap: 1rem;
  margin-top: 2rem;
  width: 80%;
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

const Table = styled.table`
  width: 70%;
  margin-left: 4.8rem;
  margin-top: 2rem;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid black;
  border-radius: 1rem;
  color: black;
  background: whitesmoke;
  overflow: hidden;

  th,
  td {
    padding: 0.5rem;
    border: 1px solid black;
    text-align: center;
  }

  tbody {
    height: 1rem;
  }

  tr:hover {
    background-color: lightgrey;
  }

  thead tr:first-child th:first-child {
    border-top-left-radius: 15px;
  }
  thead tr:first-child th:last-child {
    border-top-right-radius: 15px;
  }
  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 15px;
  }
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 15px;
  }
`;

const RemoveTd = styled.td`
  cursor: pointer;

  &:hover {
    color: whitesmoke;
    background: red;
  }
`;
