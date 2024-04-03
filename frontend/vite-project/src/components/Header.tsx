import React from "react";
import { Link } from "react-router-dom";

import MenuHamb from "../sub-components/MenuHamb";

import ResponsiveNav from "../components/ResponsiveNav";

const Header = () => {
  return (
    <>
      <header>
        <Link to="/" id="achei">
          Achei!
        </Link>
        <ul>
          <li>
            <Link to="/missing">Desaparecidos</Link>
          </li>
          <li>
            <Link to="/sign">Cadastrar Desaparecidos</Link>
          </li>
          <li>
            <Link to="/contact">Nos contate</Link>
          </li>
        </ul>
        <MenuHamb id="hamb" id_element="two"></MenuHamb>
      </header>
      <ResponsiveNav></ResponsiveNav>
    </>
  );
};

export default Header;
