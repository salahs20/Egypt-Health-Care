import React, { useState, useEffect } from "react";

const AppointmentTable = ({ appointments = [], loading, setAppointments }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newAppointment, setNewAppointment] = useState({
    service: "",
    date: "",
  });
  const [editAppointmentId, setEditAppointmentId] = useState(null);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(appointment.date).toLocaleString().includes(searchTerm)
  );

  const handleAddAppointment = async () => {
    const newAppointmentData = {
      service: newAppointment.service,
      date: newAppointment.date,
    };

    try {
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        body: JSON.stringify(newAppointmentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("فشل إضافة الموعد");
      }

      const addedAppointment = await res.json();
      setAppointments((prevAppointments) => [...prevAppointments, addedAppointment]);
      setNewAppointment({ service: "", date: "" });
    } catch (error) {
      console.error("حدث خطأ أثناء إضافة الموعد:", error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/appointments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("فشل حذف الموعد");
      }

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("حدث خطأ أثناء حذف الموعد:", error);
    }
  };

  const handleEditClick = (appointment) => {
    setEditAppointmentId(appointment.id);
    setNewAppointment({ service: appointment.service, date: appointment.date });
  };

  const handleUpdateAppointment = async () => {
    const updatedAppointment = {
      service: newAppointment.service,
      date: newAppointment.date,
    };

    try {
      const res = await fetch(`http://localhost:3000/appointments/${editAppointmentId}`, {
        method: "PUT",
        body: JSON.stringify(updatedAppointment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("فشل تحديث الموعد");
      }

      const updatedData = await res.json();

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === editAppointmentId ? updatedData : appointment
        )
      );

      setEditAppointmentId(null);
      setNewAppointment({ service: "", date: "" });
    } catch (error) {
      console.error("حدث خطأ أثناء تعديل الموعد:", error);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:3000/appointments");
        const data = await res.json();
        setAppointments(data.appointments);
      } catch (error) {
        console.error("حدث خطأ أثناء تحميل المواعيد:", error);
      }
    };

    fetchAppointments();
  }, [setAppointments]);

  return (
    <div className="pt-16 pb-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          {editAppointmentId ? "تعديل الموعد" : "إضافة موعد جديد"}
        </h2>

        {/* Form for adding/editing appointment */}
        <div className="mb-6">
          <div className="mb-4 flex flex-col sm:flex-row sm:gap-4">
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 rounded w-full"
              placeholder="اسم الخدمة"
              value={newAppointment.service}
              onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })}
            />
            <input
              type="datetime-local"
              className="border border-gray-300 py-2 px-4 rounded w-full"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            />
          </div>
          <button
            onClick={editAppointmentId ? handleUpdateAppointment : handleAddAppointment}
            className={`${
              editAppointmentId ? "bg-blue-500" : "bg-green-500"
            } text-white py-2 px-4 rounded hover:opacity-90 w-full sm:w-auto`}
          >
            {editAppointmentId ? "تحديث الموعد" : "إضافة موعد"}
          </button>
        </div>

        {/* Search Form */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="ابحث عن موعد"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Appointments Table */}
        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل المواعيد...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="py-3 px-4 text-left">الخدمة</th>
                  <th className="py-3 px-4 text-left">التاريخ والوقت</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="py-3 px-4">{appointment.service}</td>
                    <td className="py-3 px-4">
                      {new Date(appointment.date).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditClick(appointment)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentTable;
