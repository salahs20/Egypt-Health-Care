import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import domtoimage from "dom-to-image";
import Modal from "react-modal";

const ContactUs = () => {
  const phoneNumber = "201557777869"; // ضع رقمك هنا
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };
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

  const [submittedData, setSubmittedData] = useState(null); // حالة جديدة لتخزين البيانات المدخلة بعد الإرسال
  const [services, setServices] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dataRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Specialties"));
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
        const querySnapshot = await getDocs(collection(db, "Specialties"));
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

  useEffect(() => {
    const savedData = localStorage.getItem("submittedData");
    if (savedData) {
      setSubmittedData(JSON.parse(savedData));
      setModalIsOpen(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Appointments"), formData);
      setSubmittedData(formData); // تحديث حالة البيانات المدخلة بعد الإرسال
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
      }); // مسح الجدول بعد الإرسال
      setModalIsOpen(true); // فتح النافذة المنبثقة
      localStorage.removeItem("submittedData"); // إزالة البيانات من localStorage
    } catch {
      setError("فشل في إرسال الطلب، حاول مرة أخرى");
    }
  };

  const handleDownload = () => {
    const data = `
      الاسم: ${submittedData.name}
      البريد الإلكتروني: ${submittedData.email}
      رقم الهاتف: ${submittedData.phone}
      المحافظة: ${submittedData.province}
      النوع: ${submittedData.type === "clinic" ? "عيادة" : "مركز"}
      ${submittedData.type === "clinic" ? "العيادة" : "المركز"}: ${
      submittedData.clinicOrCenter
    }
      الخدمة: ${submittedData.service}
      الموعد: ${submittedData.appointment}
      ملاحظات: ${submittedData.message}
    `;
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "appointment.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = () => {
    domtoimage
      .toBlob(dataRef.current)
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "appointment.png";
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("خطأ في تحميل الصورة:", error);
      });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-[5rem]">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        احجز  موعد
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
        <select
          name="appointment"
          value={formData.appointment}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">اختر الموعد</option>
          {appointments.map((appointment, index) => (
            <option key={index} value={appointment.date}>
              {appointment.date}
            </option>
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
          {submittedData ? "عرض البيانات" : "إرسال الطلب"}
        </button>

        <button
          className="bg-green-600 text-white p-2 rounded"
          onClick={handleClick}
        >
          تعديل البيانات{" "}
        </button>
       
      </form>
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="بيانات العميل"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        {submittedData && (
          <div
            ref={dataRef}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              البيانات المدخلة
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-200">
              <p>
                <strong>الاسم:</strong> {submittedData.name}
              </p>
              <p>
                <strong>البريد الإلكتروني:</strong> {submittedData.email}
              </p>
              <p>
                <strong>رقم الهاتف:</strong> {submittedData.phone}
              </p>
              <p>
                <strong>المحافظة:</strong> {submittedData.province}
              </p>
              <p>
                <strong>النوع:</strong>{" "}
                {submittedData.type === "clinic" ? "عيادة" : "مركز"}
              </p>
              <p>
                <strong>
                  {submittedData.type === "clinic" ? "العيادة" : "المركز"}:
                </strong>{" "}
                {submittedData.clinicOrCenter}
              </p>
              <p>
                <strong>الخدمة:</strong> {submittedData.service}
              </p>
              <p>
                <strong>الموعد:</strong> {submittedData.appointment}
              </p>
              <p>
                <strong>ملاحظات:</strong> {submittedData.message}
              </p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-opacity-80"
              >
                تحميل كملف نصي
              </button>
              <button
                onClick={handleDownloadImage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-opacity-80"
              >
                تحميل كصورة
              </button>
              <button
                onClick={() => setModalIsOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-opacity-80"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactUs;
