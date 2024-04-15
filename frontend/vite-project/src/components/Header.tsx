import React from "react";
import { Link } from "react-router-dom";

import MenuHamb from "../sub-components/MenuHamb";

import ResponsiveNav from "../components/ResponsiveNav";

const Header = () => {
  return (
    <>
      <header>
        <Link to="/" id="achei">
          E-Church
        </Link>
        <ul>
          <li>
            <Link to="/missing">Igrejas Afiliadas</Link>
          </li>
          <li>
            <Link to="/sign">Cadastrar sua Igreja</Link>
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
