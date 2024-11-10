import React from "react";
import Header from "./Component/Component/Header";
import Home from "./Component/Pages/Home";
import { Route, Routes } from "react-router-dom";
import Services from "./Component/Pages/Services";
import ContactUs from "./Component/Pages/ContactUs";
import NotFound from "./Component/Pages/NotFound";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
};
export default App;
