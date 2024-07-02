import { Socket, io } from "socket.io-client";
import url from "../assets/urlBackend";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { churchSelect } from "../redux/church/slice";
import { userSelect } from "../redux/user/slice";
import styled from "styled-components";
import ApiService from "../services/Api.service";

export const Chat = () => {
  const { church_id } = useSelector(churchSelect);
  const { user_id, token, user_email, user_name } = useSelector(userSelect);

  const socketRef = useRef<Socket | null>(null);

  const [mensagem, setMensagem] = useState("");

  const [mensagens, setMensagens] = useState<any[]>([]);

  const service = ApiService();

  useEffect(() => {
    console.log(mensagens);
    const newSocket = io(url);

    newSocket.on("connect", () => {
      console.log("Conectado");

      newSocket.emit("room", church_id);
    });

    newSocket.emit("room", church_id);

    newSocket.on("conectou", (message) => {
      console.log(message);
    });

    newSocket.on("mess", ({ mensagem, data, user_id }) => {
      const rightDate = new Date(data).toLocaleString("pt-BR");

      setMensagens((current: any) => [
        ...current,
        { message: mensagem, date: rightDate, id: user_id },
      ]);
    });

    socketRef.current = newSocket;

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [church_id]);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    await service.fetchUserInfo();
  };

  const enviarMensagem = (e: React.FormEvent) => {
    try {
      e.preventDefault();

      console.log(user_id, user_email, user_name);

      if (socketRef.current) {
        socketRef.current.emit("message", { mensagem, user_id, church_id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Main>
        <ChatContainer>
          <MessageContainer>
            {mensagens.map((item, index) => (
              <MessageItem key={index} isCurrentUser={item.id === user_id}>
                <h1>{item.message}</h1>
                <h3>{item.date}</h3>
              </MessageItem>
            ))}
          </MessageContainer>

          <FormContainer>
            <Form onSubmit={enviarMensagem}>
              <input
                type="text"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
              <button type="submit">aperte</button>
            </Form>
          </FormContainer>
        </ChatContainer>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 2rem;
`;

const ChatContainer = styled.div`
  max-width: 100%;
  height: 100%;
  background: whitesmoke;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 80%;
  border: solid black 1px;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 20%;
  border: solid;
  border: solid black 1px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const MessageItem = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  align-self: ${(props) => (props.isCurrentUser ? "flex-end" : "flex-start")};
  margin-bottom: 1rem;
  flex-direction: column;
  border-radius: 3rem;
  background: green;
  width: fit-content;
  padding: 1rem;
`;
