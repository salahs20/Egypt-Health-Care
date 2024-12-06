import React from "react";
import Header from "./Component/Component/Header";
import UserLauout from "./Component/UserLayout/UserLauout";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./Component/AdminLayout/AdminLayout";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<UserLauout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
};

export default App;
