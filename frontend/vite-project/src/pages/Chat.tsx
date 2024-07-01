import { io } from "socket.io-client";
import url from "../assets/urlBackend";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { churchSelect } from "../redux/church/slice";

export const Chat = () => {
  const { church_id } = useSelector(churchSelect);

  const [entrou, setEntrou] = useState("");

  const socket = () => {
    const newSocket = io(url);

    newSocket.on("connect", () => {
      console.log("COnectead");

      newSocket.emit("room", church_id);

      newSocket.on("conectou", (mensagem: string) => {
        setEntrou(mensagem);
      });
    });

    return newSocket;
  };

  useEffect(() => {
    socket();
  }, []);
  return (
    <>
      <h1>CHATE</h1>
      <h2>{entrou}</h2>
    </>
  );
};
