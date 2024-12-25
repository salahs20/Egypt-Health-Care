import React, { useState } from "react";

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const initialUsers = [
    { id: 1, name: "صلاح", email: "salahelzeini55.com", phone: "01126250856", isAdmin: true },
    { id: 2, name: "سارة", email: "sara@example.com", phone: "987654321", isAdmin: false },
    { id: 3, name: "محمود", email: "mahmoud@example.com", phone: "555555555", isAdmin: false },
  ];

  const [users, setUsers] = useState(initialUsers);

  // تصفية المستخدمين
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // إضافة مستخدم جديد
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      setErrorMessage("جميع الحقول مطلوبة.");
      return;
    }

    const newUserData = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      isAdmin: false,
    };

    setUsers([...users, newUserData]);
    setNewUser({ name: "", email: "", phone: "" });
    setErrorMessage("");
  };

  // حذف المستخدم
  const handleDeleteUser = (userId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المستخدم؟")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // تبديل صلاحيات الأدمن
  const handleToggleAdmin = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 ">
      <div className=" md:ps-[16rem] mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">إدارة المستخدمين</h2>

        {/* رسالة الخطأ */}
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

        {/* إضافة مستخدم جديد */}
        <div className="mb-3">
          <div className="mb-4 flex items-center">
            <input
              type="text"
              className="border border-gray-300 py-2 px-4 rounded w-full"
              placeholder="اسم المستخدم"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="email"
              className="border border-gray-300 py-2 px-4 rounded w-full"
              placeholder="البريد الإلكتروني"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="tel"
              className="border border-gray-300 py-2 px-4 rounded w-full"
              placeholder="رقم الهاتف"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
          </div>
          <button
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            إضافة مستخدم
          </button>
        </div>

        {/* البحث */}
        <div className="mb-6">
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="ابحث عن مستخدم"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* جدول المستخدمين */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4">الاسم</th>
                <th className="py-3 px-4">البريد الإلكتروني</th>
                <th className="py-3 px-4">رقم الهاتف</th>
                <th className="py-3 px-4">الأدمن</th>
                <th className="py-3 px-4">الإجراءات</th>
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
      </div>
    </div>
  );
};

export default UserTable;
