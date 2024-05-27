import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import url from "../assets/urlBackend";
import UpdatePasswordForm from "../components/Form/UpdatePasswordForm";

const ForgotPassword = () => {
  const { token, email } = useParams();
  const [permitido, setPermitido] = useState<boolean | null>(null);

  const verifyToken = async () => {
    const response = await fetch(`${url}/testToken`, {
      method: "POST",
      headers: {
        "x-acess-token": token as string,
        "Content-Type": "application/json",
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
      {permitido ? (
        <>
          <UpdatePasswordForm email={email ? email : "uidbc"} />
        </>
      ) : (
        <>Permissao negada</>
      )}
    </>
  );
};

export default ForgotPassword;
