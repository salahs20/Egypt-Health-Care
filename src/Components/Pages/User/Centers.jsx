import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Centers = () => {
  const [centers, setCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const tipsSnapshot = await getDocs(collection(db, "Centers"));
        setCenters(
          tipsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };
    fetchHealthTips();
  }, []);

  useEffect(() => {
    // Fetch provinces from the database or define them statically
    const fetchProvinces = async () => {
      // Example of fetching provinces from a collection named "Provinces"
      try {
        const provincesSnapshot = await getDocs(collection(db, "Provinces"));
        setProvinces(provincesSnapshot.docs.map((doc) => doc.data().name));
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const filteredCenters = centers.filter(
    (center) =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedProvince === "" || center.province === selectedProvince)
  );

  return (
    <div className="pt-16 pb-8 px-4  ">
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
          مراكز
        </h2>
        <div className="mb-8 text-center flex justify-between ">
          <input
            className="input  w-[50%] mb-4"
            type="search"
            placeholder="ابحث عن مركز..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="input  w-[50%] mb-4"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <h4 className="text-xl font-semibold text-blue-600">
                {center.name}
              </h4>
              <p className="text-l font-semibold text-gray-600">
                الموقع: {center.address}
              </p>
              <p className="text-l font-semibold text-gray-600">
                المحافظة: {center.province}
              </p>
              <Link to="/contact">
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

export default Centers;
