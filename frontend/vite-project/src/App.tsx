import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/home.css";

import back from "./assets/background.png";

import { createGlobalStyle } from "styled-components";

import Home from "./pages/aliases/Home";
import Contact from "./pages/aliases/Contact";
import SignIn from "./pages/aliases/SignIn";
import ForgotPassword from "./pages/functions/ForgotPassword";
import Churches from "./pages/Churches";
import InputEmail from "./pages/aliases/InputEmail";
import EmailSent from "./pages/functions/EmailSent";
import SignUp from "./pages/aliases/SignUp";
import UserPage from "./pages/UserPage";
import { NotAllowed } from "./pages/functions/NotAllowed";
import { CreateChurch } from "./pages/CreateChurch";
import { EnterChurch } from "./pages/functions/EnterChurch";
import { ChurchPage } from "./pages/ChurchPage";
import { Chat } from "./pages/functions/Chat";
import { Notices } from "./pages/functions/Notices";

interface IGlobal {
  bgColor: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props: IGlobal) => props.bgColor};
        height: 100vh;

  }

  #root {
    height: 100vh;
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
        <Route path="/church/chat" element={<Chat />}></Route>
        <Route path="church/notices" element={<Notices />}></Route>
      </Routes>
    </>
  );
}

export default App;
