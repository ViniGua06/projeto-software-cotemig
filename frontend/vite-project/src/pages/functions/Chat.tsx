import { Socket, io } from "socket.io-client";
import url from "../../assets/urlBackend";
import imageBack from "../../assets/fundo.jpg";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { churchSelect } from "../../redux/church/slice";
import { userSelect } from "../../redux/user/slice";
import styled from "styled-components";
import React from "react";
import Header from "../../components/Header";

interface MessageItemProps {
  isCurrentUser: boolean;
}

const defaultImage =
  "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp";

export const Chat = () => {
  const { church_id } = useSelector(churchSelect);
  const { user_id, token, user_name } = useSelector(userSelect);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<any[]>([]);

  const getMessages = async () => {
    try {
      const res = await fetch(`${url}/messages/${church_id}`, {
        headers: {
          "x-acess-token": token,
        },
      });
      const data = await res.json();

      const updatedMessages = data.map((msg: any) => ({
        ...msg,
        created_at: new Date(msg.created_at).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        photo: msg.photo || defaultImage,
      }));

      setMensagens(updatedMessages);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  useEffect(() => {
    getMessages();

    const newSocket = io(url);

    newSocket.on("connect", () => {
      newSocket.emit("room", church_id);
    });

    newSocket.on("mess", ({ mensagem, data, user_id, user_name }: any) => {
      setMensagens((current) => [
        ...current,
        {
          text: mensagem,
          created_at: new Date(data).toLocaleString("pt-BR"),
          user_id,
          photo: defaultImage,
          name: user_name,
        },
      ]);
    });

    socketRef.current = newSocket;

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [church_id]);

  const enviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    if (socketRef.current) {
      socketRef.current.emit("message", {
        mensagem,
        user_id,
        church_id,
        user_name,
      });
      setMensagem("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Main>
        <ChatContainer>
          <MessageContainer>
            {mensagens.map((item, index) => (
              <MessageItem key={index} isCurrentUser={item.user_id === user_id}>
                {item.user_id !== user_id && (
                  <ProfileImage>
                    <img src={item.photo} alt="" />
                  </ProfileImage>
                )}
                <MessageContent>
                  <UserName>
                    {item.user_id !== user_id ? item.name : "Você"}
                  </UserName>
                  <TextMessage>{item.text}</TextMessage>
                  <Timestamp>{item.created_at}</Timestamp>
                </MessageContent>
                {item.user_id === user_id && (
                  <ProfileImage>
                    <img src={item.photo} alt="" />
                  </ProfileImage>
                )}
              </MessageItem>
            ))}
            <div ref={messagesEndRef} />
          </MessageContainer>

          <FormContainer>
            <Form onSubmit={enviarMensagem}>
              <MessageInput
                type="text"
                placeholder="Digite uma mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
              <SendButton type="submit">Enviar</SendButton>
            </Form>
          </FormContainer>
        </ChatContainer>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  background: #f0f0f0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const MessageContainer = styled.div`
  flex: 1;
  background: url(${imageBack});
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const MessageItem = styled.div<MessageItemProps>`
  display: flex;
  align-self: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  flex-direction: ${({ isCurrentUser }) =>
    isCurrentUser ? "row-reverse" : "row"};
  background: ${({ isCurrentUser }) => (isCurrentUser ? "#74c3fb" : "#ffffff")};
  padding: 1rem;
  border-radius: 1rem;
  max-width: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
`;

const ProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserName = styled.h1`
  font-size: 0.875rem;
  color: #000;
  margin: 0;
  font-weight: bold;
`;

const TextMessage = styled.p`
  font-size: 1rem;
  width: auto;
  margin: 0;
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: gray;
  align-self: flex-end;
`;

const FormContainer = styled.div`
  padding: 1rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-top: 1px solid #e0e0e0;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: #f9f9f9;

  &:focus {
    background: #ffffff;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 2rem;
  background: #0460a0;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #44a9f1;
  }
`;

export default Chat;