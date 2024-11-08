import Header from "../components/Header";
import url from "../assets/urlBackend";
import { userSelect } from "../redux/user/slice";
import { ativar, modalSelect } from "../redux/modal/slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/slice";
import { Settings, Undo2, UserRoundMinus } from "lucide-react";
import { CalendarComponent } from "../components/Calendar";

const UserEvents = () => {
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
        id="return"
        onClick={() => {
          navigate("/user");
        }}
      >
        <Undo2 size={50}></Undo2>
      </button>
      <div className="container">
        <div className="eventContainer">
          <p className="title">EVENTOS</p>
            <CalendarComponent></CalendarComponent>
          </div>
        </div>
    </>
  );
};

export default UserEvents;