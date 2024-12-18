import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeUser } from "../../redux/user/slice";
import url from "../../assets/urlBackend";
import "../Form/styles/form.css";
import { useDispatch } from "react-redux";
import { Undo2 } from "lucide-react";

interface IForm {
  opt: "logar" | "cadastrar" | "contato" | "inputEmail";
}

const Form = (opt: IForm) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          to: "hugobolopes@gmail.com",
          subject: nome + " - " + assunto,
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

  // Form Cadastro //

  const [nomeCad, setNomeCad] = useState("");
  const [emailCad, setEmailCad] = useState("");
  const [senhaCad, setSenhaCad] = useState("");

  const cadastro = async (e: any) => {
    try {
      e.preventDefault();

      const response = await fetch(`${url}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nomeCad,
          email: emailCad,
          password: senhaCad,
        }),
      });

      const data = await response.json();
      console.log(data.token, "TOKEN");

      alert(data.message);

      if (response.status == 201) {
        dispatch(changeUser({ id: data.userId, token: data.token }));

        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////

  // Form Email //////////////

  const [emailRecover, setEmailRecover] = useState("");

  const enviarEmail = async (e: any) => {
    e.preventDefault();

    const response = await fetch(`${url}/forgotPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRecover,
      }),
    });

    const data = await response.json();

    alert(data.message);

    navigate("/recover/sent");
  };

  ///////////////

  // Login ////////

  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");

  const login = async (e: any) => {
    try {
      e.preventDefault();

      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailLogin,
          senha: senhaLogin,
        }),
      });

      const data = await response.json();
      console.log(data);

      alert(data.message);

      if (response.status == 200) {
        const res = await fetch(`${url}/user/${data.userId}`);
        const user = await res.json();

        dispatch(
          changeUser({
            id: data.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            token: data.token,
          })
        );

        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////HTML do forms

  const back = () => {
    navigate("/signIn");
  };

  if (opt.opt === "logar") {
    return (
      <>
        <div className="container">
          <div className="form_area">
            <p className="title">ENTRAR</p>
            <form onSubmit={login}>
              <div className="form_group">
                <label className="sub_title" htmlFor="email">
                  Email
                </label>
                <input
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  required
                  placeholder="Digite seu email"
                  id="email"
                  className="form_style"
                  type="email"
                ></input>
              </div>
              <div className="form_group">
                <label className="sub_title" htmlFor="password">
                  Senha
                </label>
                <input
                  value={senhaLogin}
                  onChange={(e) => setSenhaLogin(e.target.value)}
                  required
                  placeholder="Digite sua senha"
                  id="password"
                  className="form_style"
                  type="password"
                ></input>
              </div>
              <div>
                <button className="btn">LOGAR</button>
                <p id="p-link">
                  Não possui uma conta?
                  <a className="link" href="/signUp">
                    Crie uma conta.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else if (opt.opt === "cadastrar") {
    return (
      <>
        <div className="container">
          <div className="form_area">
            <p className="title">CRIAR CONTA</p>
            <form onSubmit={cadastro}>
              <div className="form_group">
                <label className="sub_title" htmlFor="name">
                  Nome
                </label>
                <input
                  value={nomeCad}
                  onChange={(e) => setNomeCad(e.target.value)}
                  required
                  placeholder="Digite seu nome e sobrenome"
                  className="form_style"
                  type="text"
                ></input>
              </div>
              <div className="form_group">
                <label className="sub_title" htmlFor="email">
                  Email
                </label>
                <input
                  value={emailCad}
                  onChange={(e) => setEmailCad(e.target.value)}
                  required
                  placeholder="Digite seu email"
                  id="email"
                  className="form_style"
                  type="email"
                ></input>
              </div>
              <div className="form_group">
                <label className="sub_title" htmlFor="password">
                  Senha
                </label>
                <input
                  value={senhaCad}
                  onChange={(e) => setSenhaCad(e.target.value)}
                  required
                  placeholder="Digite uma senha"
                  id="password"
                  className="form_style"
                  type="password"
                ></input>
              </div>
              <div>
                <button className="btn">CRIAR</button>
                <p id="p-link">
                  Jà possui uma conta?
                  <a className="link" href="/signIn">
                    Faça Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else if (opt.opt === "inputEmail") {
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);
    return (
      <>
        <form className="formEmail" onSubmit={enviarEmail}>
          <h1>Recuperar Senha</h1>
          <h3>Digite o email que você cadastrou abaixo:</h3>
          <input
            type="email"
            value={emailRecover}
            onChange={(e) => setEmailRecover(e.target.value)}
            required
            ref={emailInputRef}
          />
          <input className="btn-send" type="submit" value="Enviar" />
          <button type="button" onClick={back}>
            <Undo2 />
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="form_area">
          <p className="title">Suporte ao Cliente</p>
          <form onSubmit={sendEmail}>
            <div className="form_group">
              <label className="sub_title">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Digite seu nome e sobrenome"
                className="form_style"
                type="text"
              ></input>
            </div>
            <div className="form_group">
              <label className="sub_title">Assunto</label>
              <input
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                required
                placeholder="Digite o assunto"
                className="form_style"
                type="text"
              ></input>
            </div>
            <div className="form_group">
              <label className="sub_title">Descrição</label>
              <input
              value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
                placeholder="Digite a descrição"
                className="form_style"
                type="text"
              ></input>
            </div>
            <div>
              <button className="btn">ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
