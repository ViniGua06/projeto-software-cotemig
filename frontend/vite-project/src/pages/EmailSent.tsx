import { Link } from "react-router-dom";

import "../styles/emailSent.css";

const EmailSent = () => {
  return (
    <>
      <div className="container">
        <h1>Email Enviado!</h1>
        <h2>
          Se não chegar em 5 minutos,{" "}
          <Link to="/recover">
            <i>Clique Aqui</i>{" "}
          </Link>
          para reenviar
        </h2>
      </div>
    </>
  );
};

export default EmailSent;
