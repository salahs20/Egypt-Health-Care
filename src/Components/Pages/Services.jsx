import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Services = () => {
  const [services, setServices] = useState([]);
  const [healthTips, setHealthTips] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setServices(servicesList);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      }
    };

    const fetchHealthTips = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "health"));
       
        
        const tipsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setHealthTips(tipsList);
      } catch (err) {
        console.error("خطأ في جلب نصائح الصحة:", err);
      }
    };

    fetchServices();
    fetchHealthTips();
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
                {service.title}
              </h4>
              <p className="mt-4 text-gray-600">{service.description}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                مزيد من التفاصيل
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 animate-fade-in-up text-end">
        <h3 className="text-3xl font-semibold text-blue-600 text-center mb-8">
          نصائح صحية
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthTips.map((health) => (
            <div
              key={health.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <h4 className="text-xl font-semibold text-blue-600">
                {health.title}
              </h4>
              <p className="mt-4 text-gray-600">{health.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mt-12 pb-16 animate-fade-in-up">
        <Link to="/contact">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            تواصل معنا
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;