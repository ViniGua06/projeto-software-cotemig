import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

import { select } from "../redux/user/slice";
import url from "../assets/urlBackend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout, changeUser, fetchUser } from "../redux/user/slice";

import u_defult from "../assets/user_default.png";
import { Modal } from "../components/Modal";
import { ativar } from "../redux/modal/slice";
import { ProphilePhoto } from "../components/ProphilePhoto";
import { ChangePfpForm } from "../components/Form/ChangePfpForm";

const UserPage = () => {
  const {
    token,
    isLogged,
    user_id,
    user_email,
    user_name,
    user_password,
    user_pfp,
  } = useSelector(select);

  const [id, setId] = useState(user_id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const testToken = async () => {
    try {
      const response = await fetch(`${url}/testToken`, {
        method: "POST",
        headers: {
          "x-acess-token": token,
        },
        body: JSON.stringify({
          test: "Teste",
        }),
      });

      const data = await response.json();

      if (response.status == 403) {
        alert("Sessão de usuário expirada!" + data.message);
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${url}/user/${id}`);

      const data = await response.json();

      dispatch(
        fetchUser({
          name: data.user.name,
          email: data.user.email,
          password: data.user.password,
          photo: data.user.photo,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    testToken();
  }, []);

  const deslogar = () => {
    navigate("/signIn");
    dispatch(logout());
  };

  const [modal, setModal] = useState<string>("");

  return (
    <>
      <Header></Header>
      <main style={{ padding: "3rem" }}>
        <ProphilePhoto
          onClick={() => {
            setModal("Trocar Imagem");
            dispatch(ativar());
          }}
        ></ProphilePhoto>
        <h1
          onClick={() => {
            setModal("Editar Perfil");
            dispatch(ativar());
          }}
        >
          Ola, {user_name.toUpperCase()}
        </h1>
        <button onClick={deslogar}>Deslogar</button>
      </main>

      {modal == "Trocar Imagem" ? (
        <>
          <Modal title="Trocar Imagem de Perfil" submit={() => alert("ola")}>
            <ChangePfpForm />
          </Modal>
        </>
      ) : modal == "Editar Perfil" ? (
        <>
          <Modal title="Editar Perfil" submit={() => alert("ola")}>
            <h1>ola</h1>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default UserPage;
