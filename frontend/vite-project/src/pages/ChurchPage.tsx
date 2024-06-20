import { useSelector } from "react-redux";
import Header from "../components/Header";
import { churchSelect } from "../redux/church/slice";
import { useEffect } from "react";
import ChurchService from "../services/Church.service";
import styled from "styled-components";

import igreja from "../assets/igreja.svg";
import { userSelect } from "../redux/user/slice";
import url from "../assets/urlBackend";

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

  const { user_id, token } = useSelector(userSelect);

  const churchService = ChurchService();

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

  useEffect(() => {
    getInfo();
    console.log(church_photo);
  }, []);

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
                </>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {integrants.map((item: IIntegrants) => {
              return (
                <tr>
                  <td>
                    <img
                      src={item.photo}
                      alt="imagem"
                      height={"60px"}
                      width={"60px"}
                      style={{ borderRadius: "50%" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  {role == "admin" ? (
                    <>
                      {user_id != item.id ? (
                        <>
                          <RemoveTd onClick={() => remove(parseInt(item.id))}>
                            Remover
                          </RemoveTd>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Main>
    </>
  );
};

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
