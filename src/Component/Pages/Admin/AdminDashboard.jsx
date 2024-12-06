import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import AppointmentTable from "./AppointmentTable";
import ServiceTable from "./ServiceTable";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoadingAppointments(true);
    setLoadingUsers(true);
    setLoadingServices(true);
    setError(null);

    try {
      const resAppointments = await fetch("http://localhost:3000/appointments");
      const resUsers = await fetch("http://localhost:3000/users");
      const resServices = await fetch("http://localhost:3000/services");

      if (!resAppointments.ok || !resUsers.ok || !resServices.ok) {
        throw new Error("Error fetching data");
      }

      const appointmentsData = await resAppointments.json();
      const usersData = await resUsers.json();
      const servicesData = await resServices.json();

      setAppointments(appointmentsData);
      setUsers(usersData);
      setServices(servicesData);
    } catch (error) {
      setError("حدث خطأ أثناء تحميل البيانات");
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoadingAppointments(false);
      setLoadingUsers(false);
      setLoadingServices(false);
    }
  };

  return (
    <div className="flex pt-[3.5rem]">
      {/* محتوى اللوحة */}
      <div className="w-full p-6">
        <h1 className="text-3xl font-semibold text-center text-blue-700">Dashboard</h1>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* المستخدمون */}
        <div id="users" className="mt-3">
          {/* <h2 className="text-xl font-semibold">المستخدمون</h2> */}
          <UserTable users={users} loading={loadingUsers} />
        </div>

        {/* المواعيد */}
        <div id="appointments" className="mt-3">
          {/* <h2 className="text-xl font-semibold">المواعيد</h2> */}
          <AppointmentTable
            appointments={appointments}
            loading={loadingAppointments}
            setAppointments={setAppointments}
          />
        </div>

        {/* الخدمات الطبية */}
        <div id="services" className="mt-3">
          {/* <h2 className="text-xl font-semibold">الخدمات الطبية</h2> */}
          <ServiceTable services={services} loading={loadingServices} setServices={setServices} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
