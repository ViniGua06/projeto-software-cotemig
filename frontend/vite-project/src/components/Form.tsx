import React, { useState, useEffect } from "react";

import url from "../assets/urlBackend";

import "../styles/form.css";

interface IForm {
  opt: "logar" | "cadastrar" | "contato";
}

const Form = (opt: IForm) => {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const sendEmail = async (e: any) => {
    try {
      e.preventDefault();

      const response = await fetch(`${url}/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: nome + " " + assunto,
          text: mensagem,
        }),
      });

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (opt.opt === "logar") {
    return (
      <>
        <form id="formLogin">
          <label>Email</label>
          <input type="email" />
          <label>Senha</label>
          <input type="password" />
          <button>Enviar</button>
        </form>
      </>
    );
  } else if (opt.opt === "cadastrar") {
    return (
      <>
        <form id="formCadastro">
          <label>Nome</label>
          <button>Enviar</button>
        </form>
      </>
    );
  }

  return (
    <>
      <form id="formContato">
        <label>Assunto</label>
        <input type="text" onChange={(e) => setAssunto(e.target.value)} />
        <label>Nome</label>
        <input type="text" onChange={(e) => setNome(e.target.value)} />
        <label>Mensagem</label>
        <textarea onChange={(e) => setMensagem(e.target.value)}></textarea>
        <br></br>
        <button id="btnContato" onClick={sendEmail}>
          Enviar
        </button>
      </form>
    </>
  );
};

export default Form;
