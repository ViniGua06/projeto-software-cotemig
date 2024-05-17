import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/form.css";
import url from "../../assets/urlBackend";

const UpdatePasswordForm = ({ email }: { email: string }) => {
  const navigate = useNavigate();

  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");

  const [corresponde, setCorresponde] = useState<boolean | null>(null);

  const recuperarSenha = async (e: any) => {
    try {
      e.preventDefault();

      const response = await fetch(`${url}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: senha1,
        }),
      });

      const data = await response.json();

      alert(data.message);

      navigate("/signIn");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (senha1.trim() === senha2.trim() && senha1.trim() !== "") {
      setCorresponde(true);
    } else {
      setCorresponde(false);
    }
  }, [senha1, senha2]);
  return (
    <>
      <form id="formSenhas" onSubmit={recuperarSenha}>
        <h1>Recuperação de senha</h1>
        <label>Senha</label>
        <input
          type="password"
          value={senha1}
          onChange={(e) => setSenha1(e.target.value)}
          required
        />
        <label>Digite denovo a senha</label>
        <input
          type="password"
          value={senha2}
          required
          onChange={(e) => setSenha2(e.target.value)}
        />
        {!corresponde ? (
          <>
            <h3>Senha não correspondente</h3>
          </>
        ) : (
          <>
            <input type="submit" />
          </>
        )}
      </form>
    </>
  );
};

export default UpdatePasswordForm;
