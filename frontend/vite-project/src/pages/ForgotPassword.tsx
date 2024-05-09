import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import url from "../assets/urlBackend";

const ForgotPassword = () => {
  const { token } = useParams();
  const [permitido, setPermitido] = useState<boolean | null>(null);

  const verifyToken = async () => {
    const response = await fetch(`${url}/testToken`, {
      method: "POST",
      headers: {
        "x-acess-token": token as string,
      },
      body: JSON.stringify({
        teste: "teste",
      }),
    });

    if (response.status == 200) {
      setPermitido(true);
    } else {
      setPermitido(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      {!permitido ? (
        <>
          <ForgotPassword />
        </>
      ) : (
        <>Permissao negada</>
      )}
    </>
  );
};

export default ForgotPassword;
