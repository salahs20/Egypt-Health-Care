import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  // const [errorMessage, setErrorMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        setUsers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
        setErrorMessage("حدث خطأ أثناء تحميل البيانات.");
      }
    };
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Appointments"));
        setAppointments(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setErrorMessage("حدث خطأ أثناء تحميل البيانات.");
      }
    };

    fetchUsers();
    fetchAppointments();
  }, []);
  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا الموعد؟")) {
      try {
        await deleteDoc(doc(db, "Appointments", appointmentId));
        setAppointments(
          appointments.filter((appointment) => appointment.id !== appointmentId)
        );
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      setErrorMessage("جميع الحقول مطلوبة.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "users"), newUser);
      setUsers([...users, { id: docRef.id, ...newUser }]);
      setNewUser({ name: "", email: "", phone: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorMessage("تعذر إضافة المستخدم.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المستخدم؟")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        setErrorMessage("تعذر حذف المستخدم.");
      }
    }
  };

  const handleToggleAdmin = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const updatedUser = users.find((user) => user.id === userId);
      const newAdminStatus = !updatedUser.isAdmin;
      await updateDoc(userRef, { isAdmin: newAdminStatus });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isAdmin: newAdminStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("تعذر تعديل صلاحيات المستخدم.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" pb-8  sm:px-6 lg:px-8">
      <div className="md:ps-[16rem] mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          إدارة المستخدمين
        </h2>

        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}

        <div className="mb-3">
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="الاسم"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="البريد الإلكتروني"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="رقم الهاتف"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <button
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            إضافة مستخدم
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="ابحث عن مستخدم"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4">الاسم</th>
                <th className="py-3 px-4">البريد الإلكتروني</th>
                <th className="py-3 px-4">رقم الهاتف</th>
                <th className="py-3 px-4">الأدمن</th>
                <th className="py-3 px-4">حذف</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleAdmin(user.id)}
                      className={`py-1 px-3 rounded w-full ${
                        user.isAdmin ? "bg-blue-500" : "bg-gray-500"
                      } text-white`}
                    >
                      {user.isAdmin ? "إزالة الأدمن" : "تعيين أدمن"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded w-full"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center mt-8">
        جدول الحجز
        </h2>

        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4">الاسم</th>
                <th className="py-3 px-4">رقم الهاتف</th>
                <th className="py-3 px-4">المكان </th>
                <th className="py-3 px-4">المحافظة </th>
                <th className="py-3 px-4">التخصص</th>
                <th className="py-3 px-4">المواعيد</th>
                <th className="py-3 px-4">الرسالة</th>
                <th className="py-3 px-4">حذف</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{appointment.name}</td>
                  <td className="py-3 px-4">{appointment.phone}</td>
                  <td className="py-3 px-4">{appointment.type} {appointment.clinicOrCenter}</td>
                  <td className="py-3 px-4">{appointment.province}</td>
                  <td className="py-3 px-4">{appointment.service}</td>
                  <td className="py-3 px-4">{appointment.appointment}</td>
                  <td className="py-3 px-4">{appointment.message}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded w-full"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
