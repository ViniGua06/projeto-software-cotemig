import { Socket, io } from "socket.io-client";
import url from "../assets/urlBackend";
import imageBack from "../assets/fundo.jpg";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { churchSelect } from "../redux/church/slice";
import { userSelect } from "../redux/user/slice";
import styled from "styled-components";
import ApiService from "../services/Api.service";
import React from "react";
import ChurchService from "../services/Church.service";

const checkImageURL = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

const defaultImage =
  "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp";

export const Chat = () => {
  const { church_id } = useSelector(churchSelect);
  const { user_id, token, user_email, user_name } = useSelector(userSelect);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<any[]>([]);
  const service = ApiService();

  const [count, setCount] = useState(0);

  const churchServices = ChurchService();

  const getMessages = async () => {
    try {
      const res = await fetch(`${url}/messages/${church_id}`, {
        headers: {
          "x-acess-token": token,
        },
      });
      const data = await res.json();

      console.log(data);

      const updatedMessages = await Promise.all(
        data.map(async (obj: any) => {
          try {
            const resPhoto = await fetch(`${url}/photo/${obj.user_id}`);
            const photoBlob = await resPhoto.blob();

            const res = await fetch(`${url}/user/${obj.user_id}`);

            const data = await res.json();

            const rightDate = new Date(obj.created_at).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            obj.name = data.user.name;

            const photoURL = URL.createObjectURL(photoBlob);
            const isValid = await checkImageURL(photoURL);
            obj.photo = isValid ? photoURL : defaultImage;

            obj.created_at = rightDate;
          } catch (photoError) {
            console.error(
              `Error fetching photo for user ${obj.user_id}:`,
              photoError
            );
            obj.photo = defaultImage;
          }
          return obj;
        })
      );

      setMensagens(updatedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const newSocket = io(url);

    console.log(mensagens);

    newSocket.on("connect", () => {
      console.log("Conectado");
      newSocket.emit("room", church_id);
    });

    newSocket.emit("room", church_id);

    newSocket.on("conectou", (message) => {
      console.log(message);
    });

    newSocket.on("mess", async ({ mensagem, data, user_id, user_name }) => {
      setCount(count + 1);
      const rightDate = new Date(data).toLocaleString("pt-BR");

      const res = await fetch(`${url}/photo/${user_id}`);
      const blob = await res.blob();

      const imageUrl = URL.createObjectURL(blob);
      const isValid = await checkImageURL(imageUrl);

      setMensagens((current: any) => [
        ...current,
        {
          text: mensagem,
          created_at: rightDate,
          user_id: user_id,
          photo: isValid ? imageUrl : defaultImage,
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

  useEffect(() => {
    fetchInfo();
    churchServices.changeChurchService(church_id);
  }, []);

  useEffect(() => {
    if (
      mensagens.length > 0 &&
      mensagens[mensagens.length - 1].user_id === user_id &&
      count != 0
    ) {
      scrollToBottom("smooth");
    } else {
      scrollToBottom("instant");
    }
  }, [mensagens, user_id]);

  const fetchInfo = async () => {
    await service.fetchUserInfo();
  };

  const enviarMensagem = (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (socketRef.current) {
        socketRef.current.emit("message", {
          mensagem,
          user_id,
          church_id,
          user_name,
        });

        setMensagem("");
        scrollToBottom("smooth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = (behavior: "smooth" | "instant") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
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
              <React.Fragment key={index}>
                <div
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    padding: ".8rem",
                    color: "black",
                    fontWeight: 900,
                    fontSize: "1.3rem",
                    background: "white",
                    alignSelf:
                      user_id == item.user_id ? "flex-end" : "flex-start",
                  }}
                >
                  {item.name}
                </div>
                <MessageItem iscurrentuser={item.user_id === user_id}>
                  {item.user_id === user_id ? (
                    <>
                      <TextMessage>
                        <h1>{item.text}</h1>
                        <h3>{item.created_at}</h3>
                      </TextMessage>
                      <ImageMessage>
                        <img
                          src={item.photo}
                          height={"40px"}
                          width={"40px"}
                          alt=""
                        />
                      </ImageMessage>
                    </>
                  ) : (
                    <>
                      <ImageMessage>
                        <img
                          src={item.photo}
                          height={"40px"}
                          width={"40px"}
                          alt=""
                        />
                      </ImageMessage>
                      <TextMessage style={{ paddingLeft: "1rem" }}>
                        <h1>{item.text}</h1>
                        <h3>{item.created_at}</h3>
                      </TextMessage>
                    </>
                  )}
                </MessageItem>
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </MessageContainer>

          <FormContainer>
            <Form onSubmit={enviarMensagem}>
              <input
                type="text"
                required
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

const ImageMessage = styled.div`
  width: 20%;
  display: grid;
  place-items: center;

  & > img {
    border-radius: 50%;
  }
`;

const TextMessage = styled.div`
  width: 80%;
  height: 100%;

  & > h1 {
    color: whitesmoke;
  }

  & > h3 {
    color: black;
  }
`;

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
  margin-bottom: 1rem;
  flex-direction: row;
  border-radius: 1rem;
  background: ${(props) => (props.iscurrentuser ? "green" : "brown")};
  max-width: 50%;
  padding: 1rem;
  word-wrap: break-word;

  & > h1 {
    color: whitesmoke;
  }
`;
