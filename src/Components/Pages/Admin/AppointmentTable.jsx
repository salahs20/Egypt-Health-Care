import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase"; // تأكد من استيراد إعدادات Firebase
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const AppointmentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newAppointment, setNewAppointment] = useState({ service: "", date: "" });
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Date"));
      setAppointments(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddAppointment = async () => {
    if (!newAppointment.service || !newAppointment.date) {
      setErrorMessage("يرجى إدخال الخدمة والتاريخ.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "Date"), newAppointment);
      setAppointments([...appointments, { id: docRef.id, ...newAppointment }]);
      setNewAppointment({ service: "", date: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, "Date", id));
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEditClick = (appointment) => {
    setEditAppointmentId(appointment.id);
    setNewAppointment({ service: appointment.service, date: appointment.date });
  };

  const handleUpdateAppointment = async () => {
    if (!newAppointment.service || !newAppointment.date) {
      setErrorMessage("يرجى إدخال الخدمة والتاريخ.");
      return;
    }
    try {
      const appointmentRef = doc(db, "Date", editAppointmentId);
      await updateDoc(appointmentRef, newAppointment);
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === editAppointmentId ? { id: editAppointmentId, ...newAppointment } : appointment
        )
      );
      setEditAppointmentId(null);
      setNewAppointment({ service: "", date: "" });
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" pb-8 px-4 md:ps-[16rem]">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          {editAppointmentId ? "تعديل الموعد" : "إضافة موعد جديد"}
        </h2>
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

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
            className={`${editAppointmentId ? "bg-blue-500" : "bg-green-500"} text-white py-2 px-4 rounded hover:opacity-90 w-full sm:w-auto`}
          >
            {editAppointmentId ? "تحديث الموعد" : "إضافة موعد"}
          </button>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="ابحث عن موعد"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
