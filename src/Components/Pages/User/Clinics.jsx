import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const tipsSnapshot = await getDocs(collection(db, "Clinics"));
        setClinics(
          tipsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };
    fetchHealthTips();
  }, []);

  return (
    <div className="pt-16 pb-8 px-4 ">
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
          {" "}
          عيادات
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <h4 className="text-xl font-semibold text-blue-600">
                {clinic.name}
              </h4>
              <p className="mt-4 text-gray-600">{clinic.province}</p>
              <Link to="/contact">
                {" "}
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  المزيد
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
