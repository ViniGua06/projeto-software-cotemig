import { useSelector } from "react-redux";
import { userSelect } from "../../redux/user/slice";
import styled from "styled-components";
import { useState } from "react";
import url from "../../assets/urlBackend";

import { FormEvent } from "react";

export const UpdateUserForm = () => {
  const { user_name, user_email, user_id, token, user_password } =
    useSelector(userSelect);

  const [senha1, setSenha1] = useState(user_password);
  const [senha2, setSenha2] = useState("");

  const [nome, setNome] = useState(user_name);
  const [email, setEmail] = useState(user_email);

  const hanldeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (senha1 == senha2 && senha1 != user_password) {
        const res = await fetch(`${url}/user/${user_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-acess-token": token,
          },
          body: JSON.stringify({
            name: nome,
            email: email,
            password: senha1,
          }),
        });

        const data = await res.json();

        if (data.error) {
          alert(data.error);
        } else {
          location.reload();
        }
      } else {
        const res = await fetch(`${url}/user/${user_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-acess-token": token,
          },
          body: JSON.stringify({
            name: nome,
            email: email,
          }),
        });

        const data = await res.json();

        if (data.error) {
          alert(data.error);
        } else {
          location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UpdateForm onSubmit={hanldeSubmit}>
        <UpdateFormLabel>Nome</UpdateFormLabel>
        <UpdateFormInput
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          minLength={7}
          required
        />
        <UpdateFormLabel>Email</UpdateFormLabel>
        <UpdateFormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <UpdateFormLabel>Senha</UpdateFormLabel>
        <UpdateFormInput
          type="password"
          value={senha1}
          onChange={(e) => setSenha1(e.target.value)}
          minLength={5}
          required
        />
        <UpdateFormLabel>
          Confirmar Senha (caso queira trocar a senha)
        </UpdateFormLabel>
        <UpdateFormInput
          type="password"
          onChange={(e) => setSenha2(e.target.value)}
          minLength={5}
        />

        {((senha1 != senha2 || senha1 == "" || senha2 == "") &&
          senha1 != user_password) ||
        senha2 != "" ? (
          <>
            <ErrorMessage>Senhas não conferem</ErrorMessage>
          </>
        ) : null}

        <UpdateFormSubmit type="submit" />
      </UpdateForm>
    </>
  );
};

const ErrorMessage = styled.h3`
  color: red;
`;

const UpdateForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const UpdateFormLabel = styled.label`
  color: black;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
`;

const UpdateFormInput = styled.input`
  padding: 0.6rem;
  border-radius: 5rem;
  outline: none;
  font-size: 1rem;
  font-family: sans-serif;
  letter-spacing: 0.5px;
  border-inline: none;
  border-top: none;
`;

const UpdateFormSubmit = styled.input`
  padding: 0.6rem;
  background: whitesmoke;
  border: solid rgba(0, 0, 0, 0.3) 1px;
  cursor: pointer;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  border-radius: 5rem;

  &:hover {
    background: lightgrey;
  }
`;
