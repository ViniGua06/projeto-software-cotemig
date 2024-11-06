import Header from "../components/Header"
import url from "../assets/urlBackend";
import { userSelect } from "../redux/user/slice";
import delicon from "../assets/d-account.png";
import { modalSelect } from "../redux/modal/slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/slice";

const DelIcon = delicon;
const UserSettings = () => {
  const deslogar = () => {
    navigate("/signIn");
    dispatch(logout());
  };

  const { ativo } = useSelector(modalSelect);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user_id, user_name, token } = useSelector(userSelect);

  const deleteAccount = async () => {
    try {
      const res = await fetch(`${url}/user/${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status == 200) {
        alert("Conta excluída!");
        deslogar();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header></Header>

      <button
              id="end-account"
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir sua conta?")) {
                  if (confirm("Absoluta?")) {
                    deleteAccount();
                  }
                }
              }}
            >
              <img src={DelIcon} id="del" alt="icon delete account" />
      </button>
      <button id="return" onClick={() => {
            navigate("/user")
            }}>Retornar
        </button>
    </>
  );
};

export default UserSettings;