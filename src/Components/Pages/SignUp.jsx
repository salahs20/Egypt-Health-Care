import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!name || !email || !password || !phone) {
      setError("يرجى تعبئة جميع الحقول.");
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_Url; // تأكد من تعريف هذا المتغير في ملف .env
      const response = await axios.post(`${apiUrl}/signup`,
      // const response = await axios.post(apiUrl,
         {
        name,
        email,
        password,
        phone,
       
      });

      if (response.data.error === "User already exists") {
        setError("المستخدم موجود بالفعل. يرجى تسجيل الدخول.");
        navigate("/login"); // إعادة توجيه إلى صفحة تسجيل الدخول
      } else {
        console.log("تم التسجيل بنجاح:", response.data);
        navigate("/login"); // توجيه المستخدم إلى صفحة تسجيل الدخول بعد التسجيل الناجح
      }
    } catch (err) {
      console.error("حدث خطأ أثناء التسجيل:", err);
      setError("فشل في التسجيل. يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          إنشاء حساب
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* حقل الاسم */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
              رقم الهاتف{" "}
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* حقل البريد الإلكتروني */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
              عنوان البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-2"
            >
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* رسالة الخطأ */}
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? "bg-blue-300 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "جاري التسجيل..." : "التسجيل"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
