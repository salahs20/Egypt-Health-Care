import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    province: "",
    message: "",
    appointment: "",
    type: "clinic",
    clinicOrCenter: "",
  });

  const [services, setServices] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [centers, setCenters] = useState([]);
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

    const fetchProvinces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Provinces"));
        const provinceList = querySnapshot.docs.map((doc) => doc.data().name);
        setProvinces(provinceList);
      } catch {
        setError("خطأ في تحميل المحافظات");
      }
    };

    fetchServices();
    fetchProvinces();
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

  useEffect(() => {
    if (!formData.province) return;
    const fetchClinicsAndCenters = async () => {
      try {
        const clinicsSnapshot = await getDocs(collection(db, "Clinics"));
        const filteredClinics = clinicsSnapshot.docs
          .map((doc) => doc.data())
          .filter((clinic) => clinic.province === formData.province);

        const centersSnapshot = await getDocs(collection(db, "Centers"));
        const filteredCenters = centersSnapshot.docs
          .map((doc) => doc.data())
          .filter((center) => center.province === formData.province);

        setClinics(filteredClinics);
        setCenters(filteredCenters);
      } catch {
        setError("خطأ في تحميل العيادات والمراكز");
      }
    };
    fetchClinicsAndCenters();
  }, [formData.province]);

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
        province: "",
        message: "",
        appointment: "",
        type: "clinic",
        clinicOrCenter: "",
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
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">اختر المحافظة</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="type"
              value="clinic"
              checked={formData.type === "clinic"}
              onChange={handleChange}
            />
            عيادة
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="center"
              checked={formData.type === "center"}
              onChange={handleChange}
            />
            مركز
          </label>
        </div>
        {formData.type && (
          <select
            name="clinicOrCenter"
            value={formData.clinicOrCenter}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">
              اختر {formData.type === "clinic" ? "العيادة" : "المركز"}
            </option>
            {(formData.type === "clinic" ? clinics : centers).map(
              (item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              )
            )}
          </select>
        )}
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
        <select name="appointment" value={formData.appointment} onChange={handleChange} required className="border p-2 rounded">
          <option value="">اختر الموعد</option>
          {appointments.map((appointment, index) => (
            <option key={index} value={appointment.date}>{appointment.date}</option>
          ))}
        </select>
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
