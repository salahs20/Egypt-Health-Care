import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const clinicsSnapshot = await getDocs(collection(db, "Clinics"));
        setClinics(
          clinicsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };
    fetchClinics();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provincesSnapshot = await getDocs(collection(db, "Provinces"));
        setProvinces(provincesSnapshot.docs.map((doc) => doc.data().name));
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedProvince === "" || clinic.province === selectedProvince)
  );

  return (
    <div className="pt-16 pb-8 px-4 ">
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
          عيادات
        </h2>
        <div className="mb-8 text-center flex justify-between ">
          <input
            className="input w-[50%] mb-4 me-1"
            type="search"
            placeholder=" ابحث عن عيادة ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input w-[50%] mb-4"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">اختر المحافظة</option>
            {provinces.map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <h4 className="text-xl font-semibold text-blue-600">
                {clinic.name}
              </h4>
              <h4 className="text-l font-semibold text-gray-600">
                الموقع: {clinic.address}
              </h4>
              <h4 className="text-l font-semibold text-gray-600">
                المحافظة: {clinic.province}
              </h4>
              <Link
                to={{
                  pathname: "/contact",
                  state: { clinicName: clinic.name, province: clinic.province },
                }}
              >
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  حجز
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clinics;
