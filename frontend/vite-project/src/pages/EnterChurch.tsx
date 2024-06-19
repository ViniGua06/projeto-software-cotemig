import styled from "styled-components";

import ChurchService from "../services/Church.service";
import { useState } from "react";

export const EnterChurch = () => {
  const churchService = ChurchService();

  const [code, setCode] = useState("");

  const enterChurchByCode = async (e: any) => {
    try {
      e.preventDefault();
      await churchService.enterChurch(code);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FormContainer onSubmit={enterChurchByCode}>
        <Form>
          <h1>Entrar na Instituição</h1>
          <FormLabel>Digite o Código</FormLabel>
          <FormInput
            type="text"
            minLength={12}
            maxLength={12}
            onChange={(e) => setCode(e.target.value)}
            required
          ></FormInput>
          <FormInputSubmit type="submit"></FormInputSubmit>
        </Form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.main`
  width: 100%;
  padding: 9rem;
  display: grid;
  place-items: center;
`;

const Form = styled.form`
  width: fit-content;
  height: fit-content;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  padding-block: 3rem;
  padding-inline: 3rem;
`;

const FormLabel = styled.label`
  color: black;
`;

const FormInput = styled.input`
  border-inline: none;
  border-top: none;
  outline: none;
  padding: 0.3rem 1rem;
  background: transparent;
  text-align: center;
`;

const FormInputSubmit = styled.input`
  background: green;
  color: white;
  border: green solid 1px;
  padding: 0.6rem 1.3rem;
  cursor: pointer;
`;
