import Header from "../../components/Header";
import React, { useState } from "react";
import Form from "../../components/Form/Form";

const SignIn = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Form opt="logar"></Form>
    </>
  );
};

export default SignIn;
