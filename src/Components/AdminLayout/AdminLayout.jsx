import React from "react";
import { Route, Routes } from "react-router-dom";

import HeaderAdmin from "../Component/HeaderAdmin";
import ServiceTable from "../Pages/Admin/ServiceTable";
import AppointmentTable from "../Pages/Admin/AppointmentTable";
import UserTable from "../Pages/Admin/UserTable";
import SideBar from "../Pages/Admin/SideBar";

const AdminLayout = () => {
  return (
    <>
    
      <HeaderAdmin />
      
      <SideBar />
      <div className="pt-[5rem] ps-[6rem]">fccbh</div>
      <Routes future={{ v7_startTransition: true }}>
        <Route path="*/" element={<ServiceTable />} />
        <Route path="/appointment" element={<AppointmentTable />} />
        <Route path="/user" element={<UserTable />} />
      </Routes>
    </>
  );
};

export default AdminLayout;
