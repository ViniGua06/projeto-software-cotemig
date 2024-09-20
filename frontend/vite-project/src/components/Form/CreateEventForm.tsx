import styled from "styled-components";
import url from "../../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/user/slice";
import { churchSelect } from "../../redux/church/slice";
import { useState } from "react";

export const CreateEventForm = () => {
  const { token } = useSelector(userSelect);
  const { church_id } = useSelector(churchSelect);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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
      <Form onSubmit={submit}>
        <label>Event Name:</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="eventName"
          required
        />
        <label>Detalhes do Evento</label>
        <TextArea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          name="eventName"
          required
        />
        <label>Data de início: </label>
        <Input
          value={start}
          onChange={(e) => setStart(e.target.value)}
          type="date"
          required
        />
        <label>Data de término: </label>
        <Input
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          type="date"
          required
        />
        <SubmitInput type="submit">Enviar</SubmitInput>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  outline: none;
  padding: 1rem;
`;

const SubmitInput = styled.button`
  padding: 0.7rem 0.4rem;
`;

const TextArea = styled.textarea`
  outline: none;
`;
