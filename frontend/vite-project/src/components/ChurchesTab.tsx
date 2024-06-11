import { useEffect, useState } from "react";
import ChurchService from "../services/Church.service";
import styled from "styled-components";


export interface IChurch {
  id?: number | string;
  name?: string;
  photo?: string;
  role?: string;
  total?: number;
}

export const ChurchesTab = () => {
  const [churches, setChurches] = useState<IChurch[]>([]);

  const [quantidade, setQuantidade] = useState(0);

  const service = ChurchService();

  const setArray = async () => {
    const newArray = await service.getChurchesByUser();

    if (newArray) setChurches(newArray);

    churches.map((item: any) => {
      console.log("1", item.name, "2", item.photo);
    });
  };

  useEffect(() => {
    setArray();
  }, []);

  useEffect(() => {
    if (churches.length > 0) setQuantidade(churches.length);
  }, [churches]);

  return (
    <>
      <ChurchesContainer>
        <h1>Instituições que participa - ({quantidade})</h1>
        {churches.length > 0 ? (
          <>
            <ChurchesList>
              {churches.map((item: IChurch) => {
                return (
                  <>
                    <ChurchLi key={item.id}>
                      <ChurchPhoto src={item.photo} alt="foto"></ChurchPhoto>
                      <h2>{item.name}</h2>
                      <div>Cargo: {item.role}</div>
                    </ChurchLi>
                  </>
                );
              })}
            </ChurchesList>
          </>
        ) : (
          <>
            <h2>Não é membro de nenhuma Instituição</h2>
          </>
        )}
      </ChurchesContainer>
    </>
  );
};

const ChurchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  background-color: whitesmoke;
  color: black;
  margin-top: 2rem;

  & > h1 {
    color: black;
    border-bottom: solid black 1px;
  }
`;

const ChurchesList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
`;

const ChurchLi = styled.li`
  width: 100%;
  height: 140px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1rem;
  border-bottom: solid black 1px;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const ChurchPhoto = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
