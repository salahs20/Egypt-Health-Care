import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const MedicalServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(servicesList);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="pt-20 px-4">
      <section className="animate-fade-in-up">
        <h3 className="text-3xl font-semibold text-blue-600 text-center mb-8">
          خدماتنا الطبية
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2 text-end"
            >
              <h4 className="text-xl font-semibold text-blue-600">
                {service.name}
              </h4>
              <p className="mt-4 text-gray-600">{service.description}</p>

              <Link to="/contact">
                {" "}
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  المزيد
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MedicalServices;
