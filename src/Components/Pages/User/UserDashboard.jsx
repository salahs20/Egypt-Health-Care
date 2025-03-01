import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const UserDashboard = () => {
  const userId = "user123"; // يجب استبداله بالمعرف الحقيقي للمستخدم
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [newAppointment, setNewAppointment] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchAppointments();
  }, []);

  const fetchUserData = async () => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب البيانات");
    }
  };

  const fetchAppointments = async () => {
    try {
      const appointmentsRef = collection(db, "users", userId, "Date");
      const snapshot = await getDocs(appointmentsRef);
      setAppointments(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("حدث خطأ أثناء جلب المواعيد");
    }
  };

  const handleUpdateUserData = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { ...userData, password });
      setIsEditing(false);
    } catch (err) {
      setError("حدث خطأ أثناء تحديث البيانات");
    }
    setLoading(false);
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!newAppointment) return;
    setLoading(true);
    try {
      const appointmentsRef = collection(db, "users", userId, "Date");
      const docRef = await addDoc(appointmentsRef, { date: newAppointment });
      setAppointments([
        ...appointments,
        { id: docRef.id, date: newAppointment },
      ]);
      setNewAppointment("");
    } catch (err) {
      setError("حدث خطأ أثناء إضافة الموعد");
    }
    setLoading(false);
  };

  const handleDeleteAppointment = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", userId, "Date", id));
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      setError("حدث خطأ أثناء حذف الموعد");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-[4rem]">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">بياناتك الشخصية</h3>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleUpdateUserData}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              حفظ
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              إلغاء
            </button>
          </div>
        ) : (
          <div>
            <p>الاسم: {userData.name}</p>
            <p>البريد الإلكتروني: {userData.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              تعديل البيانات
            </button>
          </div>
        )}
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
        <h3 className="text-2xl font-semibold mb-4">إدارة المواعيد</h3>
        <form onSubmit={handleAddAppointment}>
          <input
            type="datetime-local"
            value={newAppointment}
            onChange={(e) => setNewAppointment(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            إضافة موعد
          </button>
        </form>
        <ul className="mt-4">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex justify-between items-center p-2 border-b"
            >
              {appointment.date}
              <button
                onClick={() => handleDeleteAppointment(appointment.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UserDashboard;
