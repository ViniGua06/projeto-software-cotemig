import styled from "styled-components";
import { CreateChurchForm } from "../components/Form/CreateChurchForm";

export const CreateChurch = () => {
  return (
    <>
      <MainCreateChurch>
        <CreateChurchForm></CreateChurchForm>
      </MainCreateChurch>
    </>
  );
};

const MainCreateChurch = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.7rem 18rem;
`;
