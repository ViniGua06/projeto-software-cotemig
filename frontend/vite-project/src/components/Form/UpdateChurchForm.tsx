import React, { useState } from "react";
import styled from "styled-components";
import url from "../../assets/urlBackend";
import { useDispatch, useSelector } from "react-redux";
import { churchSelect } from "../../redux/church/slice";
import { userSelect } from "../../redux/user/slice";
import { desativar } from "../../redux/modal/slice";

export const UpdateChurchForm = () => {
  const { church_id, church_name } = useSelector(churchSelect);
  const { token } = useSelector(userSelect);

  const [name, setName] = useState(church_name);

  const dispatch = useDispatch();

  const update = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response = await fetch(`${url}/church/${church_id}`, {
        method: "PUT",
        headers: {
          "x-acess-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name
        }),
      });

      const data = await response.json();

      alert(data.message);

      dispatch(desativar());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={update}>
        <Label>Nome da Igreja</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          placeholder="Digite aqui o nome mudado"
        ></Input>
        <Submit type="submit">Enviar</Submit>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-inline: 5rem;
  padding-top: 2rem;
`;

const Label = styled.label`
  font-size: 1.5rem;
  display: flex;
  color: black;
`;

const Submit = styled.button`
  padding: 0.7rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  border: 3px solid #000000;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 40%;

  &:hover {
    filter: brightness(80%);
  }
`;

const Input = styled.input`
  outline: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  border: solid 0.13rem black;
  font-family: "Montserrat";
  font-size: 1rem;
  resize: vertical;
`;
