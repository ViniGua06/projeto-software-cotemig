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
          <SectionTitle>Irá acontecer</SectionTitle>
          <EventList>
            {events.map((event: any) =>
              new Date() <= new Date(event.start) ? (
                <EventCard key={event.id}>
                  <h3>Nome: {event.name}</h3>
                  <p>Descrição: {event.details}</p>
                  <EventDate>
                    Data Início:{" "}
                    {new Date(event.start).toLocaleDateString("pt-br")}
                  </EventDate>
                  <EventDate>
                    Data Término:{" "}
                    {new Date(event.end).toLocaleDateString("pt-br")}
                  </EventDate>
                </EventCard>
              ) : null
            )}
          </EventList>

          <SectionTitle>Ocorrendo</SectionTitle>
          <EventList>
            {events.map((event: any) =>
              new Date() >= new Date(event.start) &&
              new Date() <= new Date(event.end) ? (
                <EventCard key={event.id}>
                  <h3>Nome: {event.name}</h3>
                  <p>Descrição: {event.details}</p>
                  <EventDate>
                    Data Início:{" "}
                    {new Date(event.start).toLocaleDateString("pt-br")}
                  </EventDate>
                  <EventDate>
                    Data Término:{" "}
                    {new Date(event.end).toLocaleDateString("pt-br")}
                  </EventDate>
                </EventCard>
              ) : null
            )}
          </EventList>

          <SectionTitle>Terminou</SectionTitle>
          <EventList>
            {events.map((event: any) =>
              new Date() > new Date(event.end) ? (
                <EventCard key={event.id}>
                  <h3>Nome: {event.name}</h3>
                  <p>Descrição: {event.details}</p>
                  <EventDate>
                    Data Início:{" "}
                    {new Date(event.start).toLocaleDateString("pt-br")}
                  </EventDate>
                  <EventDate>
                    Data Término:{" "}
                    {new Date(event.end).toLocaleDateString("pt-br")}
                  </EventDate>
                </EventCard>
              ) : null
            )}
          </EventList>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 80%;
  gap: 2rem;
  padding: 1.5rem;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
  text-align: center;
`;

const EventList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const EventCard = styled.li`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  text-align: left;

  h3 {
    font-size: 1.2rem;
    color: #444;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 0.5rem 0;
  }
`;

const EventDate = styled.h2`
  font-size: 1rem;
  color: #888;
  margin: 0.5rem 0;
`;