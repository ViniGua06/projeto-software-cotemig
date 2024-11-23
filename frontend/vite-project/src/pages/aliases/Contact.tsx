import Header from "../../components/Header";
import React, { useState } from "react";

import "../../styles/form.css";

import Forms from "../../components/Form/Form";

const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>

      <div className="form-container">
        <Forms opt="contato"></Forms>
      </div>
    </>
  );
};

export default Contact;
