import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import ContactUs from "../Pages/ContactUs";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import UserDashboard from "../Pages/User/UserDashboard";

// import UserTable from "../Pages/Admin/UserTable";
// import AppointmentTable from "../Pages/Admin/AppointmentTable";
// import ServiceTable from "../Pages/Admin/ServiceTable";
import Header from "../Component/Header";
import HealthTips from "../Pages/User/HealthTips";
import Clinics from "../Pages/User/Clinics";
import Centers from "../Pages/User/Centers";
import Whatsapp from "../Component/Whatsapp";
import Help from "../Component/Help";

const UserLauout = () => {
  return (
    <div>
      <Header />
      <Routes future={{ v7_startTransition: true }}>
        <Route path="/" element={<Home />} exact />
        <Route path="/services" element={<Services />} exact />
        <Route path="/contact" element={<ContactUs />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/userDashboard" element={<UserDashboard />} exact />
        <Route path="/healthTips" element={<HealthTips />} exact />
        <Route path="/Clinics" element={<Clinics />} exact />
        <Route path="/Centers" element={<Centers />} exact />

        {/* <Route path="/UserTable" element={<UserTable />} exact />
        <Route path="/AppointmentTable" element={<AppointmentTable />} exact />
        <Route path="/ServiceTable" element={<ServiceTable />} exact /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>{" "}
      {/* <Whatsapp /> */}
      <Help/>
    </div>
  );
};

export default UserLauout;
