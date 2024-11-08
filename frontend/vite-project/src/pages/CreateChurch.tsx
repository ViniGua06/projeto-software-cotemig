import styled from "styled-components";
import { CreateChurchForm } from "../components/Form/CreateChurchForm";
import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";

export const CreateChurch = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainCreateChurch>
        <button
          id="return"
          onClick={() => {
            navigate("/user");
          }}
        >
          <Undo2 size={80}></Undo2>
        </button>
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
