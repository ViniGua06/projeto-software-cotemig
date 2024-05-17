import React from "react";
import Header from "../components/Header";

import "../styles/form.css";

import EmailPic from "../assets/mail-2048128_1280.png";
import Forms from "../components/Form/Form";

const Contact = () => {
  return (
    <>
      <Header></Header>

      <div className="form-container">
        <div>
          <img src={EmailPic} id="imgContato" />
        </div>
        <Forms opt="contato"></Forms>
      </div>
    </>
  );
};

export default Contact;
