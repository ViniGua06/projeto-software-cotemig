import styled from "styled-components";
import Header from "../components/Header";
import { CreateEventForm } from "../components/Form/CreateEventForm";

export const CreateEvent = () => {
  return (
    <>
      <Header></Header>
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
