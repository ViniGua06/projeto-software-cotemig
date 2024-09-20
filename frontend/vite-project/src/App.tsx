import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/home.css";

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
import { Bible } from "./pages/Bible";
import { CreateEvent } from "./pages/CreateEvent";

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
  const [bg, setBg] = useState(`url("")`);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setBg("#0460a0");
        break;

      default:
        setBg("white");
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
        <Route path="/church/notices" element={<Notices />}></Route>
        <Route path="/church/bible" element={<Bible />}></Route>
        <Route path="/user/events/create" element={<CreateEvent />}></Route>
      </Routes>
    </>
  );
}

export default App;
