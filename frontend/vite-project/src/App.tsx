import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/aliases/Home";
import Contact from "./pages/aliases/Contact";
import SignIn from "./pages/aliases/SignIn";
import ForgotPassword from "./pages/functions/ForgotPassword";
import InputEmail from "./pages/aliases/InputEmail";
import EmailSent from "./pages/functions/EmailSent";
import SignUp from "./pages/aliases/SignUp";
import UserPage from "./pages/UserPage";
import { NotAllowed } from "./pages/functions/NotAllowed";
import { CreateChurch } from "./pages/CreateChurch";
import { ChurchPage } from "./pages/ChurchPage";
import { Chat } from "./pages/functions/Chat";
import { Notices } from "./pages/functions/Notices";
import { Bible } from "./pages/Bible";
import { CreateEvent } from "./pages/CreateEvent";
import { Invite } from "./pages/Invite";
import UserSettings from "./pages/UserSettings";
import UserEvents from "./pages/UserEvents";
import { ChurchMembers } from "./pages/ChurchMembers";


function App() {
  const location = useLocation();
  const [, setBg] = useState(`url("")`);

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/recover" element={<InputEmail />}></Route>
        <Route path="/recover/sent" element={<EmailSent />}></Route>
        <Route path="/church/members" element={<ChurchMembers />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route
          path="/forgotPassword/:token/:email"
          element={<ForgotPassword />}
        ></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/usersettings" element={<UserSettings />}></Route>
        <Route path="/userevents" element={<UserEvents />}></Route>
        <Route path="/user/notallowed" element={<NotAllowed />} />
        <Route path="/church/create" element={<CreateChurch />}></Route>
        <Route path="/church" element={<ChurchPage />}></Route>
        <Route path="/church/chat" element={<Chat />}></Route>
        <Route path="/church/notices" element={<Notices />}></Route>
        <Route path="/bible" element={<Bible />}></Route>
        <Route path="/church/events/create" element={<CreateEvent />}></Route>
        <Route path="/invite/:token" element={<Invite />}></Route>
      </Routes>
    </>
  );
}

export default App;