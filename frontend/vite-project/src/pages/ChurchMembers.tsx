import styled from "styled-components";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { churchSelect } from "../redux/church/slice";
import { useEffect } from "react";
import ChurchService from "../services/Church.service";
import igreja from "../assets/igreja.svg";
import { userSelect } from "../redux/user/slice";
import url from "../assets/urlBackend";
import { useNavigate } from "react-router-dom";
import default_ from "../assets/images.png";
import ApiService from "../services/Api.service";
import { ativar, desativar, modalSelect } from "../redux/modal/slice";
import {
  Undo2,
} from "lucide-react";

interface IIntegrants {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}


export const ChurchMembers = () => {
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

    const goBack = () => {
      navigate("/church");
    };

    useEffect(() => {
      apiService.fetchUserInfo();
      apiService.testToken();

      getInfo();
    }, []);

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev); 
    };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <button
        id="return"
        onClick={goBack}
      >
        <Undo2 size={50}></Undo2>
      </button>
      <div id="MainChurchMembersPage">
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
        </Main>
      </div>
    </>
  );
};


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
`;

const Table = styled.table`
  width: 150%;
  margin-top: 2rem;
  border-spacing: 0;
  border: 0.2rem solid black;
  padding: 1rem;
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

  th {
    color: #0460a0;
    text-transform: uppercase;
    text-weight: 700;
  }

  tbody {
    height: 1rem;
  }

  tr:hover {
    background-color: lightgrey;
  }

  thead tr:first-child th:first-child {
    border: 1px solid black;
  }
  thead tr:first-child th:last-child {
    border: 1px solid black;
  }
  tbody tr:last-child td:first-child {
    border: 1px solid black;
  }
  tbody tr:last-child td:last-child {
    border: 1px solid black;
  }
`;

const RemoveTd = styled.td`
  cursor: pointer;

  &:hover {
    color: whitesmoke;
    background: red;
  }
`;