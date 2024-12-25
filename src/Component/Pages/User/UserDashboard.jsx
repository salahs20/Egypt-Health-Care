import React, { useState } from "react";

const UserDashboard = () => {
  const [name, setName] = useState("Salah Mohamed");
  const [email, setEmail] = useState("salahelzeini55@gmail.com");
  const [password, setPassword] = useState("");
  const [newAppointment, setNewAppointment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [appointments, setAppointments] = useState([]); // مصفوفة لحفظ المواعيد

  const handlePersonalDataSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!name || !email || !password) {
      setError("يرجى تعبئة جميع الحقول.");
      setIsSubmitting(false);
      return;
    }

    // منطق لتحديث البيانات الشخصية
    console.log("الاسم:", name);
    console.log("البريد الإلكتروني:", email);
    console.log("كلمة المرور:", password);

    setIsEditing(false);
    setIsSubmitting(false);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!newAppointment) {
      setError("يرجى تحديد الموعد.");
      setIsSubmitting(false);
      return;
    }

    // إضافة الموعد الجديد إلى مصفوفة المواعيد
    setAppointments([
      ...appointments,
      { id: Date.now(), date: newAppointment },
    ]);
    setNewAppointment("");
    setIsSubmitting(false);
  };

  const handleEditAppointment = (id) => {
    const newDate = prompt(
      "أدخل التاريخ الجديد للموعد (مثال: 2024-12-15T10:00)"
    );
    if (newDate) {
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, date: newDate }
            : appointment
        )
      );
    }
  };

  const handleCancelAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="flex h-screen pt-[3.5rem]">
      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-gray-700">
              {" "}
              <span className="font-bold text-xl">Hello, </span>
               {name}
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer">
              {name[0]}
            </div>
          </div>
        </div>

        {/* Personal Data Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            بياناتك الشخصية
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                الاسم الكامل
              </label>
              <div className="text-gray-700">{name}</div>
              {isEditing && (
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="text-gray-700">{email}</div>
              {isEditing && (
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="text-gray-700">********</div>
              {isEditing && (
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}

            {isEditing ? (
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handlePersonalDataSubmit}
                  className={`bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSubmitting ? "bg-blue-300 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "جاري التحديث..." : "تحديث البيانات"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  إلغاء
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                تعديل البيانات
              </button>
            )}
          </div>
        </div>

        {/* Appointment Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            إدارة المواعيد
          </h3>
          <form onSubmit={handleAppointmentSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="appointment"
                  className="block text-sm text-gray-700 mb-2"
                >
                  تحديد الموعد
                </label>
                <input
                  type="datetime-local"
                  id="appointment"
                  value={newAppointment}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-500 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isSubmitting ? "bg-green-300 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "جاري التحديث..." : "تحديد الموعد"}
              </button>
            </div>
          </form>

          {/* Appointment List */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              المواعيد المحجوزة
            </h4>
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="flex justify-between items-center"
                >
                  <div>{appointment.date}</div>
                  <div>
                    <button
                      onClick={() => handleEditAppointment(appointment.id)}
                      className="bg-yellow-500 text-white py-1 px-4 rounded-lg mx-2"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-lg"
                    >
                      إلغاء
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
