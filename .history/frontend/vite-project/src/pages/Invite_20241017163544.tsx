import { useParams } from "react-router-dom";
import url from "../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import { useEffect, useState } from "react";

import * as jwt_decode from "jwt-decode";

export const Invite = () => {
  const { token } = useParams();
  const { user_id } = useSelector(userSelect);

  const [decoded, setDecoded] = useState<null | string>(null);

  const getChurch = async () => {
    const res = await fetch(`${url}/enterchurch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id, token: token }),
    });

    const data = await res.json();

    alert(data.message);
  };

  const decode = async () => {
    const decodeda = jwt_decode.jwtDecode(token!);
    setDecoded(decodeda.payload.toString());

    const res = await fetch(`${url}/church/${decoded}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("OK");
    }
  };

  useEffect(() => {
    decode();
  });
  return (
    <>
      <h1>INVITE</h1>
    </>
  );
};
