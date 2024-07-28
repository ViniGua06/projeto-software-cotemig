import React, { useState } from "react";
import styled from "styled-components";
import url from "../../assets/urlBackend";
import { useDispatch, useSelector } from "react-redux";
import { churchSelect } from "../../redux/church/slice";
import { userSelect } from "../../redux/user/slice";
import { desativar } from "../../redux/modal/slice";

export const UpdateChurchForm = () => {
  const { church_id, church_name, church_code } = useSelector(churchSelect);
  const { token } = useSelector(userSelect);

  const [name, setName] = useState(church_name);
  const [code, setCode] = useState(church_code);

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
          name: name,
          code: code,
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
        ></Input>
        <Label>Código (Mínimo 12 caracteres)</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          minLength={12}
          maxLength={12}
          required
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
  justify-content: flex-start;
  gap: 1rem;
  padding-inline: 5rem;
  padding-top: 2rem;
`;

const Label = styled.label`
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.3rem;
  outline: none;
  border-inline: none;
  border-top: none;
`;

const Submit = styled.button`
  padding: 0.3rem;
  cursor: pointer;
`;
