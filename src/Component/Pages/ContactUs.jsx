import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة الكود لإرسال البيانات إلى الخادم أو API.
    alert('تم إرسال الطلب بنجاح');
  };

  return (
    <div className="pt-[4rem] pb-8 px-4">
      {/* Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          حجز موعد استشارة طبية
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل اسمك"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل رقم هاتفك"
                required
              />
            </div>

            {/* Service Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">الخدمة المطلوبة</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">اختر الخدمة</option>
                <option value="استشارة طبية">استشارة طبية</option>
                <option value="رعاية أسنان">رعاية أسنان</option>
                <option value="جراحة">جراحة</option>
              </select>
            </div>

            {/* Message Field */}
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2">ملاحظات أو تفاصيل إضافية</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل أي تفاصيل إضافية"
                rows="4"
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-6 rounded-md text-lg hover:bg-blue-600 transition duration-300"
            >
              إرسال الطلب
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="text-center mt-16 text-gray-600">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">معلومات التواصل</h3>
        <p className="text-lg">إذا كنت بحاجة إلى مزيد من المساعدة، يمكنك التواصل معنا عبر الوسائل التالية:</p>
        <div className="mt-4">
          <p><strong>الهاتف:</strong> +20 123 456 789</p>
          <p><strong>البريد الإلكتروني:</strong> support@cliniccare.com</p>
          <p><strong>العنوان:</strong> 123 شارع الأطباء، القاهرة، مصر</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
