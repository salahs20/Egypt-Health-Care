import React from "react";
import Header from "./Component/Component/Header";
import UserLauout from "./Component/UserLayout/UserLauout";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./Component/AdminLayout/AdminLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <>
      
      <Routes future={{ v7_startTransition: true }}>
        <Route path="/*" element={<UserLauout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
};

export default App;
