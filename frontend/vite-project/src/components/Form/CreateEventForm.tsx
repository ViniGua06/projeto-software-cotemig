import styled from "styled-components";
import url from "../../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/user/slice";
import { useNavigate } from "react-router-dom";
import { churchSelect } from "../../redux/church/slice";
import { useState } from "react";
import { Undo2 } from "lucide-react";

export const CreateEventForm = () => {
  const { token } = useSelector(userSelect);
  const { church_id } = useSelector(churchSelect);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const navigate = useNavigate();

  const submit = async (e: any) => {
    try {
      e.preventDefault();

      const startDate = new Date(start);
      const endDate = new Date(end);

      const atualDate = new Date();

      if (startDate > endDate) {
        alert("Término não pode ser antes do Início!");
      } else if (atualDate > endDate) {
        alert("Data de término não pode ser anterior a data atual!");
      } else {
        const res = await fetch(`${url}/events/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-acess-token": token,
          },
          body: JSON.stringify({
            name: name,
            details: details,
            start: start,
            end: end,
            church_id: church_id,
          }),
        });

        const data = await res.json();

        alert(data.message);

        if (res.status == 201) {
          setName("");
          setDetails("");
          setStart("");
          setEnd("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CreateEventContainer>
        <Title>Criar Evento</Title>
        <Form onSubmit={submit}>
          <Label>Nome do Evento:</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="eventName"
            required
          />
          <Label>Detalhes do Evento:</Label>
          <TextArea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            name="eventName"
            required
          />
          <Label>Data de início: </Label>
          <Input
            value={start}
            onChange={(e) => setStart(e.target.value)}
            type="date"
            required
          />
          <Label>Data de término: </Label>
          <Input
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            type="date"
            required
          />
          <SubmitInput type="submit">CRIAR</SubmitInput>
        </Form>
      </CreateEventContainer>
    </>
  );
};

const Title = styled.h1`
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1.5rem;
  text-decoration: underline;
`;

const CreateEventContainer = styled.div`
  padding: 2rem;
  width: 65%;
  height: auto;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(214, 233, 251);
  border: 5px solid #0460a0;
  margin: 0 auto;
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 1.5rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: black;
`;

const Input = styled.input`
  outline: none;
  padding: 0.7rem;
  font-family: "Montserrat";
  font-size: 1rem;
  border-radius: 0.3rem;

  &[type="date"] {
    cursor: text;
  }
`;

const SubmitInput = styled.button`
  padding: 0.7rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 1rem;
  font-weight: 800;
  text-align: center;
  border: 3px solid #0460a0;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 40%;

  &:hover {
    filter: brightness(80%);
  }
`;

const TextArea = styled.textarea`
  outline: none;
  padding: 0.2rem;
  border-radius: 0.3rem;
  border: solid 0.13rem black;
  font-family: "Montserrat";
  font-size: 1rem;
  resize: vertical;
`;