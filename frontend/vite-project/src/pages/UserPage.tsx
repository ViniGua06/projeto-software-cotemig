import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

import { select } from "../redux/user/slice";
import url from "../assets/urlBackend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout, changeUser, fetchUser } from "../redux/user/slice";

import u_defult from "../assets/user_default.png";
import { Modal } from "../components/Modal";

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

  return (
    <>
      <Header></Header>
      <main style={{ padding: "3rem" }}>
        {user_pfp ? (
          <>
            <img
              src={user_pfp}
              style={{ borderRadius: "50%" }}
              height="40px"
              alt=""
            />
          </>
        ) : (
          <>
            <img
              src={u_defult}
              style={{ borderRadius: "50%" }}
              height="90px"
              alt=""
            />
          </>
        )}
        <h1>Ola, {user_name}</h1>
      </main>

      <Modal></Modal>
    </>
  );
};

export default UserPage;
