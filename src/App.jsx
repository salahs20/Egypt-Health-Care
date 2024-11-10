import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Component/Component/Header";
import Home from "./Component/Pages/Home";
import Services from "./Component/Pages/Services";
import ContactUs from "./Component/Pages/ContactUs";
import NotFound from "./Component/Pages/NotFound";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/services" element={<Services />} exact />
        <Route path="/contact" element={<ContactUs />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;