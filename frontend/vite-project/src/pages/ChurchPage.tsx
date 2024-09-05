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

  const { user_id, token, user_email } = useSelector(userSelect);

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

  return (
    <>
      <Header></Header>
      <Main>
        <h1>{church_name}</h1>
        <ChurchPhoto src={church_photo || igreja}></ChurchPhoto>

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

        <button onClick={goToChat}>Chat</button>
        {role == "admin" ? (
          <>
            <button onClick={goToCreateNotice}>Criar Aviso</button>
            <button onClick={goToUpdateChurchForm}>Editar Igreja</button>
          </>
        ) : null}
        <button onClick={goToNotices}>Avisos</button>

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
        ) : null}

        <button onClick={goToBiblePage}>Biblia Digital</button>
      </Main>
    </>
  );
};

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
  height: 140px;
  width: 140px;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin-top: 1rem;
  border: solid black 1px;
  color: black;
  background: whitesmoke;

  th,
  td {
    padding: 1rem;
    border: solid black 1px;
    text-align: center;
  }
`;

const RemoveTd = styled.td`
  cursor: pointer;

  &:hover {
    color: whitesmoke;
    background: red;
  }
`;
