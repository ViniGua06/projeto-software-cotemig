import { useEffect, useState } from "react";
import url from "../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";
import styled from "styled-components";

export const CalendarComponent = () => {
  const { user_id, token } = useSelector(userSelect);

  const [churches, setChurches] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const getChurches = async () => {
    try {
      const res = await fetch(`${url}/churches/${user_id}`, {
        method: "GET",
        headers: {
          "x-acess-token": token,
        },
      });

      const data = await res.json();

      const churchIds = data.map((item: any) => item.id.toString());
      setChurches(churchIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChurches();
  }, []);

  useEffect(() => {
    if (churches.length > 0) {
      getEvents();
    }
  }, [churches]);

  const getEvents = async () => {
    try {
      const res2 = await fetch(`${url}/eventsbychurches`, {
        method: "POST",
        headers: {
          "x-acess-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ churches }),
      });

      const data2 = await res2.json();
      setEvents(data2);

      console.log("AGORA VAI", data2);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {events.length > 0 ? (
        <Container>
          <h1>Eventos:</h1>
          <h1>Pra Acontecer</h1>

          <EventList>
            {events.map((event: any) => {
              return (
                <>
                  {new Date() <= new Date(event.start) ? (
                    <>
                      <li key={event.id}>
                        <h3>Nome: {event.name}</h3>
                        <h3>Descrição: {event.details}</h3>
                        <h2>
                          Data Início:{" "}
                          {new Date(event.start).toLocaleDateString("pt-br")}
                        </h2>
                        <h2>
                          Data Término:{" "}
                          {new Date(event.end).toLocaleDateString("pt-br")}
                        </h2>
                      </li>
                    </>
                  ) : null}
                </>
              );
            })}
          </EventList>
          <h1>Acontecendo</h1>
          <EventList>
            {events.map((event: any) => {
              return (
                <>
                  {new Date() == new Date(event.start) &&
                  new Date() <= new Date(event.end) ? (
                    <>
                      <li key={event.id}>
                        <h3>Nome: {event.name}</h3>
                        <h3>Descrição: {event.details}</h3>
                        <h2>
                          Data Início:{" "}
                          {new Date(event.start).toLocaleDateString("pt-br")}
                        </h2>
                        <h2>
                          Data Término:{" "}
                          {new Date(event.end).toLocaleDateString("pt-br")}
                        </h2>
                      </li>
                    </>
                  ) : null}
                </>
              );
            })}
          </EventList>

          <h1>Terminou</h1>
          <EventList>
            {events.map((event: any) => {
              return (
                <>
                  {new Date() > new Date(event.end) ? (
                    <>
                      <li key={event.id}>
                        <h3>Nome: {event.name}</h3>
                        <h3>Descrição: {event.details}</h3>
                        <h2>
                          Data Início:{" "}
                          {new Date(event.start).toLocaleDateString("pt-br")}
                        </h2>
                        <h2>
                          Data Término:{" "}
                          {new Date(event.end).toLocaleDateString("pt-br")}
                        </h2>
                      </li>
                    </>
                  ) : null}
                </>
              );
            })}
          </EventList>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EventList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
