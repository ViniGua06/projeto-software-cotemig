import { Socket, io } from "socket.io-client";
import url from "../assets/urlBackend";
import imageBack from "../assets/fundo.jpg";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<any[]>([]);
  const service = ApiService();

  useEffect(() => {
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

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  const fetchInfo = async () => {
    await service.fetchUserInfo();
  };

  const enviarMensagem = (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (socketRef.current) {
        socketRef.current.emit("message", { mensagem, user_id, church_id });

        setMensagem("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Main>
        <ChatContainer>
          <MessageContainer
            style={{ backgroundImage: "url(" + imageBack + ")" }}
          >
            {mensagens.map((item, index) => (
              <MessageItem key={index} iscurrentuser={item.id === user_id}>
                <h1>{item.message}</h1>
                <h3>{item.date}</h3>
              </MessageItem>
            ))}
            <div ref={messagesEndRef} />
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
  background: white;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 80%;
  border: solid black 1px;
  background-image: ${imageBack};
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 20%;
  border: solid black 1px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const MessageItem = styled.div<{ iscurrentuser: boolean }>`
  display: flex;
  align-self: ${(props) => (props.iscurrentuser ? "flex-end" : "flex-start")};
  background: ${(props) => (props.iscurrentuser ? "#2aa32c" : "#164a17")};
  margin-bottom: 1rem;
  flex-direction: column;
  border-radius: 1rem;
  background: ${(props) => (props.iscurrentuser ? "green" : "lightgray")};
  max-width: 50%;
  padding: 1rem;
  word-wrap: break-word;
  & > h1 {
    color: whitesmoke;
  }
`;
