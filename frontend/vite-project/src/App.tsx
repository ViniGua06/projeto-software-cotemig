import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/home.css";

import back from "./assets/background.png";

import { createGlobalStyle } from "styled-components";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Churches from "./pages/Churches";
import InputEmail from "./pages/InputEmail";
import EmailSent from "./pages/EmailSent";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import { NotAllowed } from "./pages/NotAllowed";
import { CreateChurch } from "./pages/CreateChurch";
import { EnterChurch } from "./pages/EnterChurch";
import { ChurchPage } from "./pages/ChurchPage";

interface IGlobal {
  bgColor: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props: IGlobal) => props.bgColor};
  }

`;

function App() {
  const location = useLocation();
  const [bg, setBg] = useState(`url("${back}")`);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setBg(`url("${back}")`);
        break;

      default:
        setBg("#f7dec8");
        break;
    }
  }, [location]);
  return (
    <>
      <GlobalStyle bgColor={bg}></GlobalStyle>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/churches" element={<Churches />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/recover" element={<InputEmail />}></Route>
        <Route path="/recover/sent" element={<EmailSent />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route
          path="/forgotPassword/:token/:email"
          element={<ForgotPassword />}
        ></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/user/notallowed" element={<NotAllowed />} />
        <Route path="/church/create" element={<CreateChurch />}></Route>
        <Route path="/enterchurch" element={<EnterChurch />}></Route>
        <Route path="/user/church" element={<ChurchPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
