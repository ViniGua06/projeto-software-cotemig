import Header from "../components/Header";
import { userSelect } from "../redux/user/slice";
import { modalSelect } from "../redux/modal/slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CalendarComponent } from "../components/Calendar";
import { churchSelect } from "../redux/church/slice";
import styled from "styled-components";

const UserEvents = () => {
  useSelector(churchSelect);
  useSelector(modalSelect);
  useSelector(userSelect);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Container>
        <EventContainer>
          <p className="title">EVENTOS</p>
          <CalendarComponent></CalendarComponent>
        </EventContainer>
      </Container>
    </>
  );
};

const EventContainer = styled.div`
  display: flex;
  background-color: #e7edff;
  margin: 10rem auto;
  width: 70%;
  height: auto;
  border: 5px solid #0460a0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & a:hover {
    text-decoration: underline;
  }
`;

export default UserEvents;
