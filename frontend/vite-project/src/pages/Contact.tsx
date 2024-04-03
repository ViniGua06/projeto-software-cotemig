import React from "react";
import Header from "../components/Header";

import EmailPic from "../assets/mail-2048128_1280.png";
import Forms from "../components/Form";

const Contact = () => {
  return (
    <>
      <Header></Header>
      <img src={EmailPic} height="400px" alt="" />
      <Forms opt="contato"></Forms>
    </>
  );
};

export default Contact;
