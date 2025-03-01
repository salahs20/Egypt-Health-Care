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
    fetchUsers();
  }, []);

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
    <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
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
            placeholder="اسم المستخدم"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border py-2 px-4 w-full"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border py-2 px-4 w-full"
          />
          <input
            type="tel"
            placeholder="رقم الهاتف"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="border py-2 px-4 w-full"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white py-2 px-4 rounded w-full"
          >
            إضافة مستخدم
          </button>
        </div>
        <input
          type="text"
          placeholder="ابحث عن مستخدم"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border py-2 px-4 w-full mb-4"
        />
       <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
  <thead className="bg-blue-600 text-white">
    <tr>
      <th className="py-3 px-4 text-center">الاسم</th>
      <th className="py-3 px-4 text-center">البريد الإلكتروني</th>
      <th className="py-3 px-4 text-center">رقم الهاتف</th>
      <th className="py-3 px-4 text-center">الأدمن</th>
      <th className="py-3 px-4 text-center">الإجراءات</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
    {filteredUsers.map((user) => (
      <tr
        key={user.id}
        className="hover:bg-gray-100 transition-all duration-200"
      >
        <td className="py-3 px-4 text-center">{user.name}</td>
        <td className="py-3 px-4 text-center">{user.email}</td>
        <td className="py-3 px-4 text-center">{user.phone}</td>
        <td className="py-3 px-4 text-center">
          <button
            onClick={() => handleToggleAdmin(user.id)}
            className={`py-2 px-4 rounded-lg font-semibold transition-all w-full
              ${user.isAdmin ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500 hover:bg-gray-700"} text-white`}
          >
            {user.isAdmin ? "إزالة الأدمن" : "تعيين أدمن"}
          </button>
        </td>
        <td className="py-3 px-4 text-center">
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-all w-full"
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
  );
};

export default UserTable;

// import React, { useEffect, useState } from "react";
// import { db } from "../../../../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";

// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     message: "",
//     appointment: "",
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         setUsers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setErrorMessage("حدث خطأ أثناء تحميل البيانات.");
//       }
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "appointments"));
//         setAppointments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         setErrorMessage("حدث خطأ أثناء تحميل المواعيد.");
//       }
//     };
//     fetchAppointments();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "appointments"), formData);
//       alert("تم إرسال الطلب بنجاح");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         service: "",
//         message: "",
//         appointment: "",
//       });
//     } catch {
//       setError("فشل في إرسال الطلب، حاول مرة أخرى");
//     }
//   };

//   return (
//     <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
//       <div className="md:ps-[16rem] mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">إدارة المستخدمين</h2>
//         {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
        
//         {/* جدول المستخدمين */}
//         <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="py-3 px-4 text-center">الاسم</th>
//               <th className="py-3 px-4 text-center">البريد الإلكتروني</th>
//               <th className="py-3 px-4 text-center">رقم الهاتف</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-300">
//             {users.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-100 transition-all duration-200">
//                 <td className="py-3 px-4 text-center">{user.name}</td>
//                 <td className="py-3 px-4 text-center">{user.email}</td>
//                 <td className="py-3 px-4 text-center">{user.phone}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {/* جدول المواعيد */}
//         <h2 className="text-2xl font-semibold text-blue-700 mt-8 mb-4 text-center">المواعيد القادمة</h2>
//         <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="py-3 px-4 text-center">التاريخ</th>
//               <th className="py-3 px-4 text-center">الوقت</th>
//               <th className="py-3 px-4 text-center">الوصف</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-300">
//             {appointments.map((appointment) => (
//               <tr key={appointment.id} className="hover:bg-gray-100 transition-all duration-200">
//                 <td className="py-3 px-4 text-center">{appointment.date}</td>
//                 <td className="py-3 px-4 text-center">{appointment.time}</td>
//                 <td className="py-3 px-4 text-center">{appointment.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserTable;