import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_Url; // تأكد من تعيين VITE_API_URL في .env
      const response = await axios.post(`${apiUrl}/login`, { email, password });

      // التحقق من نوع المستخدم
      if (response.data.isAdmin === true) {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        "فشل تسجيل الدخول. الرجاء التحقق من البريد الإلكتروني وكلمة المرور."
      );
      console.error(err);
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          تسجيل الدخول
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1"
            >
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            تسجيل الدخول
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ليس لديك حساب؟{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            إنشاء حساب
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
