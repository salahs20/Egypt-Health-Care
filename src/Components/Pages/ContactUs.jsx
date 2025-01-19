import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [services, setServices] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [error, setError] = useState("");

  // Fetch services and appointments on load
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Url}/appointments`);
      if (response.data) {
        // Group services by name
        const servicesData = response.data.reduce((acc, item) => {
          if (!acc[item.service]) {
            acc[item.service] = [];
          }
          acc[item.service].push(item);
          return acc;
        }, {});
        setServices(Object.keys(servicesData)); // Set service names
        setAvailableAppointments([]); // Reset available appointments
      } else {
        setError("لا توجد خدمات متاحة.");
      }
    } catch (error) {
      setError("حدث خطأ أثناء تحميل الخدمات.");
    }
  };

  // Fetch available appointments based on selected service
  const fetchAvailableAppointments = async (service) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Url}/appointments`, {
        params: { service },
      });
      if (response.data) {
        const serviceAppointments = response.data.filter(
          (appointment) => appointment.service === service
        );
        setAvailableAppointments(serviceAppointments);
      } else {
        setError("لا توجد مواعيد متاحة لهذا التخصص.");
      }
    } catch (error) {
      setError("حدث خطأ أثناء تحميل المواعيد.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "service" && value) {
      setLoadingAppointments(true);
      setError(""); // Reset error
      fetchAvailableAppointments(value);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال الطلب بنجاح");
  };

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch available appointments when the service is selected or changed
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
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Service */}
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
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment */}
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
                      <option key={index} value={appointment.date}>
                        {new Date(appointment.date).toLocaleString()}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            {/* Message */}
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
