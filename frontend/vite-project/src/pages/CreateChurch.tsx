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
    @media (max-width: 1200px) {
    padding: 1.7rem 10rem;
  }

  @media (max-width: 992px) {
    padding: 1.7rem 5rem;
  }

  @media (max-width: 768px) {
    padding: 1.7rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.7rem 1rem;
  }

  button#return {
    position: absolute;
    top: 2rem;
    left: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
  }

  @media (max-width: 768px) {
    button#return {
      top: 1rem;
      left: 1rem;
      size: 60px;
    }
  }

  @media (max-width: 480px) {
    button#return {
      top: 1rem;
      left: 1rem;
      size: 50px;
    }
  }
`;
