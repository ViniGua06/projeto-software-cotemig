import { useNavigate, useParams } from "react-router-dom";
import url from "../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import { useEffect, useState } from "react";

import * as jwt_decode from "jwt-decode";
import { IChurch } from "../components/ChurchesTab";
import styled from "styled-components";

export const Invite = () => {
  const { token } = useParams();
  const { user_id } = useSelector(userSelect);

  const [decoded, setDecoded] = useState<null | string>(null);
  const [allowed, setAllowed] = useState(false);

  const [church, setChurch] = useState<IChurch>();

  const navigate = useNavigate();

  const enterChurch = async () => {
    const res = await fetch(`${url}/enterchurch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id, token: token }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/user/");
    } else {
      alert(data.error);
    }
  };

  const decode = async () => {
    const decodeda = jwt_decode.jwtDecode(token!);
    setDecoded(decodeda.payload.toString());

    setAllowed(true);
  };

  const getChurch = async () => {
    const res = await fetch(`${url}/church/${decoded}`);
    const data = await res.json();

    setChurch(data);

    setAllowed(false);
  };

  useEffect(() => {
    console.log(new Date());
    decode();

    if (allowed) getChurch();
  }, [token, user_id, decoded]);
  return (
    <Main>
      <H1>Você foi convidado para a Instituição:</H1> 
      <H2>{church?.name}</H2>
      <Button onClick={enterChurch}>Aceitar Convite</Button>
    </Main>
  );
};

const H1 = styled.h1`
font-size: 3rem;
text-align: center;
`;

const H2 = styled.div`
  font-size: 2.5rem;
  margin-top: -2rem;
  text-decoration: underline;
  margin-bottom: 2rem;
  text-align: center;
`;

const Main = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const Button = styled.button`
  padding: 1rem;
  width: 30%;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
  border-radius: 2rem;

  &:hover{
    filter: brightness(80%)
  }
`;
