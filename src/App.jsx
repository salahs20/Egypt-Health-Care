import React from "react";
import UserLauout from "./Components/UserLayout/UserLauout";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./Components/AdminLayout/AdminLayout";
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
