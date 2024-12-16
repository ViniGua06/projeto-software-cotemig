import styled from "styled-components";
import Header from "../components/Header";
import { CreateEventForm } from "../components/Form/CreateEventForm";
import { useState } from "react";

export const CreateEvent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Main>
        <CreateEventForm></CreateEventForm>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 3rem;
`;