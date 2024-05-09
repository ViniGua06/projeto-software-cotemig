import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import url from "../assets/urlBackend";

import "../styles/form.css";

interface IForm {
  opt: "logar" | "cadastrar" | "contato" | "inputEmail";
}

const Form = (opt: IForm) => {
  const navigate = useNavigate();
  // Form Contato
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const sendEmail = async (e: any) => {
    try {
      e.preventDefault();

      console.log("Enviado");

      const response = await fetch(`${url}/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "viniguarnierisouza@gmail.com",
          subject: nome + " " + assunto,
          text: mensagem,
        }),
      });

      const data = await response.json();

      alert(data.message);

      setNome("");
      setAssunto("");
      setMensagem("");
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////

  // Form Email

  const back = () => {
    navigate("/signIn");
  };

  if (opt.opt === "logar") {
    return (
      <>
        <form id="formLogin">
          <h1>Login</h1>
          <label>Email</label>
          <input type="email" required />
          <label>Senha</label>
          <input type="password" required />
          <Link to="/recover">
            <i>Esqueci a senha</i>
          </Link>
          <div className="ct-input">
            <input type="submit" value="Logar"></input>
          </div>
          <Link to="/signUp">
            <i>Ainda não tenho uma conta</i>
          </Link>
        </form>
      </>
    );
  } else if (opt.opt === "cadastrar") {
    return (
      <>
        <form id="formCadastro">
          <h1>Cadastro</h1>
          <label>Nome</label>
          <input type="text" required />
          <label>Email</label>
          <input type="email" required />
          <label>Senha</label>
          <input type="password" required />
          <input type="submit"></input>
          <Link to="/signIn">
            <i>Já tenho uma conta</i>
          </Link>
        </form>
      </>
    );
  } else if (opt.opt === "inputEmail") {
    return (
      <>
        <form className="formEmail">
          <h1>Recuperar Senha</h1>
          <h2>Digite o email que cadastrou sua conta para recuperar a senha</h2>
          <input type="email" required />
          <input type="submit" value="Enviar" />
          <button onClick={back}>Voltar</button>
        </form>
      </>
    );
  }

  return (
    <>
      <form id="formContato" onSubmit={sendEmail}>
        <label>Assunto</label>
        <input
          type="text"
          onChange={(e) => setAssunto(e.target.value)}
          required
        />
        <label>Nome</label>
        <input type="text" onChange={(e) => setNome(e.target.value)} required />
        <label>Mensagem</label>
        <textarea
          onChange={(e) => setMensagem(e.target.value)}
          required
        ></textarea>
        <input type="submit" id="btnContato" value="Enviar"></input>
      </form>
    </>
  );
};

export default Form;
