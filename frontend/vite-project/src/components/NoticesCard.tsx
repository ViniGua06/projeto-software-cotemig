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
  }, [id, userid]);
  const setAware = async () => {
    try {
      await fetch(`${url}/notice/setaware/${id}/${userid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedAware = await getNotices();
      setCurrentAware(updatedAware);

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
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Text = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  word-break: break-word;
  width: 100%;
  padding-inline: 1rem;
`;

interface IAware {
  isClicked: boolean;
}

const Aware = styled.h2<IAware>`
  color: ${(props) =>
    props.isClicked ? "#28a745" : "#dc3545"};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: ${(props) => (props.isClicked ? "default" : "pointer")};
  transition: color 0.2s;

  &:hover {
    color: ${(props) =>
      !props.isClicked
        ? "#28a745"
        : null};
  }
`;