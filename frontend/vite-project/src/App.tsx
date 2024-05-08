import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./styles/home.css";

import Home from "./pages/Home";
import Missing from "./pages/Missing";
import Contact from "./pages/Contact";
import Sign from "./pages/Sign";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/missing" element={<Missing />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/sign" element={<Sign />}></Route>
          <Route
            path="forgotPassword/:token"
            element={<ForgotPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
