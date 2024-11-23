import Form from "../../components/Form/Form";
import Header from "../../components/Header";
import React, { useState } from "react";

const SignUp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Form opt="cadastrar"></Form>
    </>
  );
};

export default SignUp;
