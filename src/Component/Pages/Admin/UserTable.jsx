import React, { useState } from "react";

const UserTable = ({ users = [], loading, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });

  // تصفية المستخدمين
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (userId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المستخدم؟")) {
      await fetch(`http://localhost:3000/users/${userId}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleAddUser = async () => {
    const newUserData = {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const addedUser = await res.json();
    setUsers([...users, addedUser]);
    setNewUser({ name: "", email: "", phone: "" });
  };

  const handleToggleAdmin = async (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
    );
    setUsers(updatedUsers);

    const userToUpdate = updatedUsers.find((user) => user.id === userId);

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ isAdmin: userToUpdate.isAdmin }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  if (loading) return <p className="text-center text-gray-500">جاري تحميل البيانات...</p>;

  return (
    <div className="pt-16 pb-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          إدارة المستخدمين
        </h2>

        {/* إضافة مستخدم جديد */}
        <div className="mb-6">
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
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
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
                      className={`py-1 px-3 rounded ${
                        user.isAdmin ? "bg-blue-500" : "bg-gray-500"
                      } text-white`}
                    >
                      {user.isAdmin ? "إزالة الأدمن" : "تعيين أدمن"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
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
