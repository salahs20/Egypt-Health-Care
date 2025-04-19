import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Centers = () => {
  const [centers, setCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [visibleCenters, setVisibleCenters] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const tipsSnapshot = await getDocs(collection(db, "Centers"));
        setCenters(
          tipsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        setError("حدث خطأ أثناء جلب البيانات.");
      } finally {
        setLoading(false);
      }
    };
    fetchHealthTips();
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

  const loadMoreCenters = () => {
    setVisibleCenters((prev) => prev + 6);
  };

  const filteredCenters = centers.filter(
    (center) =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedProvince === "" || center.province === selectedProvince)
  );

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="text-center">جاري التحميل...</p>;
  }

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
          {filteredCenters.slice(0, visibleCenters).map((center) => (
            <div
              key={center.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <Link to={`/center/${center.id}`}>
                <h4 className="text-xl font-semibold text-blue-600">
                  {center.name}
                </h4>
              </Link>
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
          {filteredCenters.length === 0 && (
            <p className="text-center text-gray-500">لا توجد مراكز مطابقة للبحث.</p>
          )}
        </div>
        {visibleCenters < filteredCenters.length && (
      <div className="flex justify-center mt-6">
      <button
        onClick={loadMoreCenters}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        عرض المزيد
      </button>
    </div>
     
      
        )}
       
      </div>
    </div>
  );
};

export default Centers;
