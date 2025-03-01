import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    appointment: "",
  });
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Date"));
        const serviceSet = new Set();
        querySnapshot.forEach((doc) => serviceSet.add(doc.data().service));
        setServices([...serviceSet]);
      } catch {
        setError("خطأ في تحميل الخدمات");
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!formData.service) return;
    setLoading(true);
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Date"));
        const filtered = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((data) => data.service === formData.service);
        setAppointments(filtered);
      } catch {
        setError("خطأ في تحميل المواعيد");
      }
      setLoading(false);
    };
    fetchAppointments();
  }, [formData.service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Appointments"), formData);
      alert("تم إرسال الطلب بنجاح");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        appointment: "",
      });
    } catch {
      setError("فشل في إرسال الطلب، حاول مرة أخرى");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-[5rem]">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        احجز موعد
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">اختر الخدمة</option>
          {services.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>
        {formData.service && (
          <select
            name="appointment"
            value={formData.appointment}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">اختر موعد</option>
            {loading ? (
              <option>تحميل...</option>
            ) : (
              appointments.map((app, index) => (
                <option key={index} value={app.date}>
                  {new Date(app.date).toLocaleString()}
                </option>
              ))
            )}
          </select>
        )}
        <textarea
          name="message"
          placeholder="ملاحظات"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="border p-2 rounded"
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          إرسال الطلب
        </button>
      </form>
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default ContactUs;