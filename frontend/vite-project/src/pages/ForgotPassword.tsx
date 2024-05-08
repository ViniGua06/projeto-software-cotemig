import React, { useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import url from "../assets/urlBackend";

const ForgotPassword = () => {
  const { token } = useParams();
  const [permitido, setPermitido] = useState<boolean | null>(null);

  const verifyToken = async () => {
    const response = await fetch(`${url}/testToken`, {
      method: "POST",
      headers: {
        "x-acess-token": token?.trim() as string,
      },
      body: JSON.stringify({
        teste: "teste",
      }),
    });

    console.log(token);

    if (response.status == 200) {
      setPermitido(true);
    } else {
      setPermitido(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return <>{permitido ? <>OLA {token}</> : <>Permissao negada</>}</>;
};

export default ForgotPassword;
