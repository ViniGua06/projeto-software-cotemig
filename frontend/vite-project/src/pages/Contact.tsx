import React from "react";
import Header from "../components/Header";

import "../styles/form.css"

import EmailPic from "../assets/mail-2048128_1280.png";
import Forms from "../components/Form";

const Contact = () => {
  return (
    <>
      <Header></Header>
      <div id="divcntt">
      <img src={EmailPic} id="imgContato" height="200px" width="250px" alt="" />
      <Forms opt="contato"></Forms>
      </div>
    </>
  );
};

export default Contact;
