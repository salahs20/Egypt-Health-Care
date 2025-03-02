import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const HealthTips = () => {
  const [healthTips, setHealthTips] = useState([]);

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const tipsSnapshot = await getDocs(collection(db, "tips"));
        setHealthTips(tipsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };
    fetchHealthTips();
  }, []);

  return (
    <div className="pt-16 pb-8 px-4 ">
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">نصائح طبية</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <h4 className="text-xl font-semibold text-blue-600">{tip.title}</h4>
              <p className="mt-4 text-gray-600">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
