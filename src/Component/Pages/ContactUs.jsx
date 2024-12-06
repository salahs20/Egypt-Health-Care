import React, { useState, useEffect } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    appointment: "",
  });

  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [error, setError] = useState("");

  // دالة لجلب المواعيد المتاحة بناءً على الخدمة المختارة
  const fetchAvailableAppointments = async (service) => {
    try {
      const response = await fetch(`http://localhost:3000/appointments?service=${service}`);
      const data = await response.json();
      if (data && data.appointments) {
        setAvailableAppointments(data.appointments);
      } else {
        setError("لا توجد مواعيد متاحة لهذا التخصص.");
      }
    } catch (error) {
      setError("حدث خطأ أثناء تحميل المواعيد.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  // دالة للتعامل مع التغييرات في المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "service" && value) {
      setLoadingAppointments(true);
      setError(""); // إعادة تعيين الخطأ
      fetchAvailableAppointments(value);
    }
  };

  // دالة لمعالجة إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال الطلب بنجاح");
  };

  // استخدام useEffect لتحميل المواعيد عند تغيير الخدمة
  useEffect(() => {
    if (formData.service) {
      setLoadingAppointments(true);
      fetchAvailableAppointments(formData.service);
    }
  }, [formData.service]);

  // التعديل هنا لإعادة تحميل المواعيد عند إضافة موعد جديد
  useEffect(() => {
    if (formData.service) {
      setLoadingAppointments(true);
      fetchAvailableAppointments(formData.service);
    }
  }, [formData.service]);

  return (
    <div className="pt-16 pb-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          حجز موعد استشارة طبية
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* حقل الاسم */}
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

            {/* حقل البريد الإلكتروني */}
            <div>
              <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* حقل رقم الهاتف */}
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

            {/* حقل الخدمة */}
            <div>
              <label className="block text-gray-700 mb-2">الخدمة المطلوبة</label>
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

            {/* حقل الموعد */}
            {formData.service && (
              <div>
                <label className="block text-gray-700 mb-2">اختيار الموعد</label>
                <select
                  name="appointment"
                  value={formData.appointment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">اختر موعد</option>
                  {loadingAppointments ? (
                    <option disabled>جاري تحميل المواعيد...</option>
                  ) : error ? (
                    <option disabled>{error}</option>
                  ) : (
                    availableAppointments.map((appointment, index) => (
                      <option key={index} value={appointment}>
                        {new Date(appointment).toLocaleString()}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            {/* حقل الرسالة */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 mb-2">ملاحظات أو تفاصيل إضافية</label>
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
    </div>
  );
};

export default ContactUs;
