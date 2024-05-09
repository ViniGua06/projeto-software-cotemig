import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

import { select } from "../redux/user/slice";
import url from "../assets/urlBackend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";

import { logout, changeUser, fetchUser } from "../redux/user/slice";

const UserPage = () => {
  const { token, isLogged, user_id, user_email, user_name, user_password } =
    useSelector(select);

  const [id, setId] = useState(user_id);

  const [tokenState, setTokenState] = useState(token);

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
          token: data.token,
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
      <UserCard
        id={parseInt(user_id)}
        email={user_email}
        name={user_name}
        password={user_password}
      ></UserCard>
    </>
  );
};

export default UserPage;
