import React, { useState } from "react";

const AppointmentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newAppointment, setNewAppointment] = useState({ service: "", date: "" });
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Static appointments data
  const [appointments, setAppointments] = useState([
    { id: 1, service: "خدمة 1", date: "2024-12-25T10:00" },
    { id: 2, service: "خدمة 2", date: "2024-12-26T14:00" },
    { id: 3, service: "خدمة 3", date: "2024-12-27T09:30" },
  ]);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(appointment.date).toLocaleString().includes(searchTerm)
  );

  const handleAddAppointment = () => {
    if (!newAppointment.service || !newAppointment.date) {
      setErrorMessage("يرجى إدخال الخدمة والتاريخ.");
      return;
    }

    const newAppointmentData = { id: appointments.length + 1, service: newAppointment.service, date: newAppointment.date };
    setAppointments([...appointments, newAppointmentData]);
    setNewAppointment({ service: "", date: "" });
    setErrorMessage("");
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleEditClick = (appointment) => {
    setEditAppointmentId(appointment.id);
    setNewAppointment({ service: appointment.service, date: appointment.date });
  };

  const handleUpdateAppointment = () => {
    if (!newAppointment.service || !newAppointment.date) {
      setErrorMessage("يرجى إدخال الخدمة والتاريخ.");
      return;
    }

    const updatedAppointment = { id: editAppointmentId, service: newAppointment.service, date: newAppointment.date };
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === editAppointmentId ? updatedAppointment : appointment
      )
    );
    setEditAppointmentId(null);
    setNewAppointment({ service: "", date: "" });
    setErrorMessage("");
  };

  return (
    <div className="pt-16 pb-8 px-4 md:ps-[16rem]">
      <div className=" mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          {editAppointmentId ? "تعديل الموعد" : "إضافة موعد جديد"}
        </h2>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

        {/* Form */}
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

        {/* Search */}
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
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="py-3 px-4">{appointment.service}</td>
                    <td className="py-3 px-4">{new Date(appointment.date).toLocaleString()}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-3 text-gray-500">
                    لا توجد مواعيد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
