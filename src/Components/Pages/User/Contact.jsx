import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const { clinicName = "", province = "" } = location.state || {};

  const [formData, setFormData] = useState({
    clinicName,
    province,
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="pt-16 pb-8 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
          حجز موعد
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">اسم العيادة:</label>
          <input
            type="text"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleChange}
            className="input w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">المحافظة:</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="input w-full"
            readOnly
          />
        </div>
        {/* Add other form fields here */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default Contact;