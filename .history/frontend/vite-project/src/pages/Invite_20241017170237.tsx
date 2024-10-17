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

  const enterChurch = async () => {
    const res = await fetch(`${url}/enterchurch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id, token: token }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      const nav = useNavigate();
      nav("/churche");
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
      <h1>Você está sendo convidado para a Instituição {church?.name}</h1>
      <Button onClick={enterChurch}>Aceitar Convite</Button>
    </Main>
  );
};

const Main = styled.main`
  padding: 2rem;
`;

const Button = styled.button`
  padding: 1rem;
`;
