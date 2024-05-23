import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./styles/home.css";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Churches from "./pages/Churches";
import InputEmail from "./pages/InputEmail";
import EmailSent from "./pages/EmailSent";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
