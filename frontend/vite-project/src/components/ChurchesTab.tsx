import { useEffect, useState } from "react";
import ChurchService from "../services/Church.service";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  const goToChurch = async (church_id: any) => {
    await service.changeChurchService(church_id);
    console.log(church_id, "INGREJA");
    navigate("/church");
  };

  return (
    <>
      <ChurchesContainer>
        {churches.length > 0 ? (
          <ChurchesList>
            <Title>Minhas igrejas:</Title>
            {churches.map((item: IChurch, key) => (
              <ChurchLi key={key} onClick={() => goToChurch(item.id)}>
                <ChurchPhoto src={item.photo}/>
                <h2>{item.name}</h2>
                <div>Cargo: {item.role}</div>
              </ChurchLi>
            ))}
          </ChurchesList>
        ) : (
          <p>Você ainda não está associado a nenhuma igreja.</p>
        )}
      </ChurchesContainer>
    </>
  );
};

const ChurchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  background-color: #f5f5f5;
  color: #333;
  margin: 1rem auto;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  & > h1 {
    color: #333;
    border-bottom: solid #ddd 1px;
    text-transform: uppercase;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.5rem;
  }
`;

const Title = styled.h3`
  align-self: flex-start;
  font-size: 1.1rem;
  color: black;
  margin-bottom: 1rem;
`;

const ChurchesList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  margin: 1rem 0;
  background-color: #f5f5f5;
`;

const ChurchLi = styled.li`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: solid #ddd 1px;
  gap: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ececec;
    border-radius: 0.2rem;
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #444;
    flex: 1;
  }

  div {
    color: #777;
    font-size: 0.9rem;
  }
`;

const ChurchPhoto = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 1rem;
`;