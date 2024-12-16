import { Link } from "react-router-dom";
import styled from "styled-components";

const EmailSent = () => {
  return (
    <>
      <Container>
        <h1>Email Enviado!</h1>
        <h2>
          Se não chegar em 5 minutos,{" "}
          <Link to="/recover">
            <i>Clique Aqui</i>{" "}
          </Link>
          para reenviar
        </h2>
      </Container>
    </>
  );
};

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

export default EmailSent;
