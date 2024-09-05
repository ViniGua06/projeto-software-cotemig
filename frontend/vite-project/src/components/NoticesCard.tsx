import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelect } from "../redux/user/slice";
import url from "../assets/urlBackend";
import { churchSelect } from "../redux/church/slice";

export const NoticesContainer = ({
  author,
  text,
  aware,
  id,
  userid,
}: {
  author: string;
  text: string;
  aware: number;
  id: number;
  userid: number;
}) => {
  const { user_id } = useSelector(userSelect);
  const { church_id } = useSelector(churchSelect);

  const [isClicked, setClicked] = useState(false);
  const [currentAware, setCurrentAware] = useState(aware);

  const checkIfIsAlreadyAware = async () => {
    try {
      const res = await fetch(`${url}/notice/checkaware/${id}/${userid}`);
      const data = await res.json();

      if (data.message) {
        setClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfIsAlreadyAware();
  }, [id, userid]); // Dependências para garantir que a função seja chamada corretamente

  const setAware = async () => {
    try {
      await fetch(`${url}/notice/setaware/${id}/${userid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Atualizar o estado local de aware
      const updatedAware = await getNotices();
      setCurrentAware(updatedAware);
      
      // Atualizar o estado de clique
      setClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotices = async () => {
    try {
      const res = await fetch(`${url}/notices/${parseInt(church_id)}`);
      const data = await res.json();
      const notice = data.find((u: any) => u.id === id);
      return notice?.aware || 0;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  return (
    <CardContainer>
      <h1>De {author}</h1>
      <Text>{text}</Text>
      <Aware onClick={() => !isClicked && setAware()} isClicked={isClicked}>
        Estou ciente: ({currentAware})
      </Aware>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 100%;
  height: fit-content;
  border: solid black 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1rem;
  gap: 1rem;
`;

const Text = styled.p`
  color: black;
  word-break: break-word;
  width: 100%;
  padding-inline: 1rem;
`;

interface IAware {
  isClicked: boolean;
}

const Aware = styled.h2<IAware>`
  color: ${(props) => (props.isClicked ? "green" : "red")};
  cursor: ${(props) => (props.isClicked ? "auto" : "pointer")};
  ${(props) =>
    !props.isClicked ? "&:hover { color: green; }" : null}
`;
