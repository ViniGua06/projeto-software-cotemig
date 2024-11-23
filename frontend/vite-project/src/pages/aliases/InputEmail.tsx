import Form from "../../components/Form/Form";
import Header from "../../components/Header";
import React, { useState } from "react";

const InputEmail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Form opt="inputEmail"></Form>
    </>
  );
};

export default InputEmail;
