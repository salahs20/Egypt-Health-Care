import React from "react";
import UserLauout from "./Components/UserLayout/UserLauout";
import { Route, Routes } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserLauout />} />
      </Routes>
    </>
  );
};

export default App;
