import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import AppointmentTable from "./AppointmentTable";
import ServiceTable from "./ServiceTable";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const resAppointments = await fetch("http://localhost:3000/appointments");
      const resUsers = await fetch("http://localhost:3000/users");
      const resServices = await fetch("http://localhost:3000/services");

      const appointmentsData = await resAppointments.json();
      const usersData = await resUsers.json();
      const servicesData = await resServices.json();

      setAppointments(appointmentsData);
      setUsers(usersData);
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-[3.5rem]">
      {/* محتوى اللوحة */}
      <div className="w-full  p-6">
        <h1 className="text-3xl font-semibold text-center text-blue-700">Dashboard</h1>

        {/* المستخدمون */}
        <div id="users" className="mt-6">
          {/* <h2 className="text-xl font-semibold">Users</h2> */}
          <UserTable users={users} loading={loading} />
        </div>

        {/* المواعيد */}
        <div id="appointments" className="mt-6">
          {/* <h2 className="text-xl font-semibold">المواعيد</h2> */}
          <AppointmentTable
            appointments={appointments}
            loading={loading}
            setAppointments={setAppointments}
          />
        </div>

        {/* الخدمات الطبية */}
        <div id="services" className="mt-6">
          {/* <h2 className="text-xl font-semibold">الخدمات الطبية</h2> */}
          <ServiceTable
            services={services}
            loading={loading}
            setServices={setServices}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
