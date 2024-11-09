import React from "react";
import Header from "./Component/Component/Header";
import Home from "./Component/Pages/Home";
import { Route, Routes } from "react-router-dom";
import Services from "./Component/Pages/Services";
import ContactUs from "./Component/Pages/ContactUs";

const App = () => {
  return (
    <>
      <Header/>
     

<Routes>
<Route path="/" element={<Home/>}/>
<Route path="services" element={<Services/>}/>
<Route path="contact" element={<ContactUs/>}/>




</Routes>
    </>
  );
};
export default App;
