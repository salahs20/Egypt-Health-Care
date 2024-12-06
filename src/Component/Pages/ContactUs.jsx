import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال الطلب بنجاح");
  };

  return (
    <div className="pt-16 pb-8 px-4">
      {/* Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-fade-in-up">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          حجز موعد استشارة طبية
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 mb-2">الاسم الكامل</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-700 mb-2">رقم الهاتف</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Service Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                الخدمة المطلوبة
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              >
                <option value="">اختر الخدمة</option>
                <option value="استشارة طبية">استشارة طبية</option>
                <option value="رعاية أسنان">رعاية أسنان</option>
                <option value="جراحة">جراحة</option>
              </select>
            </div>

            {/* Message Field */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 mb-2">
                ملاحظات أو تفاصيل إضافية
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              إرسال الطلب
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="text-center mt-16 text-gray-600 animate-fade-in-up">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          معلومات التواصل
        </h3>
        <p className="text-lg">
          إذا كنت بحاجة إلى مزيد من المساعدة، يمكنك التواصل معنا عبر الوسائل
          التالية:
        </p>
        <div className="mt-4">
          <p>
            <strong>الهاتف:</strong> +20 123 456 789
          </p>
          <p>
            <strong>البريد الإلكتروني:</strong> support@cliniccare.com
          </p>
          <p>
            <strong>العنوان:</strong> 123 شارع الأطباء، القاهرة، مصر
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
