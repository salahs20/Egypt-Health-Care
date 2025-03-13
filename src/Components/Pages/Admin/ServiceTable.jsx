import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import AdminServices from "./AdminServices";

const ServiceTable = () => {
  const [provinces, setProvinces] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [centers, setCenters] = useState([]);
  const [locationData, setLocationData] = useState({
    province: "",
    clinic: "",
    center: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const provincesSnapshot = await getDocs(collection(db, "Provinces"));
      setProvinces(
        provincesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      const clinicsSnapshot = await getDocs(collection(db, "Clinics"));
      setClinics(
        clinicsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      const centersSnapshot = await getDocs(collection(db, "Centers"));
      setCenters(
        centersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchData();
  }, []);

  const handleAddLocation = async () => {
    if (!locationData.province || !locationData.clinic || !locationData.center)
      return;
    try {
      const provinceRef = await addDoc(collection(db, "Provinces"), {
        name: locationData.province,
      });
      const clinicRef = await addDoc(collection(db, "Clinics"), {
        name: locationData.clinic,
        provinceId: provinceRef.id,
        provinceId: provinceRef.id,
        province: locationData.province,
      });
      const centerRef = await addDoc(collection(db, "Centers"), {
        name: locationData.center,
        clinicId: clinicRef.id,
        provinceId: provinceRef.id,
        province: locationData.province,
      });

      setProvinces([
        ...provinces,
        { id: provinceRef.id, name: locationData.province },
      ]);
      setClinics([
        ...clinics,
        {
          id: clinicRef.id,
          name: locationData.clinic,
          provinceId: provinceRef.id,
          provinceId: provinceRef.id,
          province: locationData.province,
        },
      ]);
      setCenters([
        ...centers,
        {
          id: centerRef.id,
          name: locationData.center,
          clinicId: clinicRef.id,
          provinceId: provinceRef.id,
          province: locationData.province,
        },
      ]);

      setLocationData({ province: "", clinic: "", center: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteClinic = async (clinicId) => {
    try {
      await deleteDoc(doc(db, "Clinics", clinicId));
      setClinics(clinics.filter((clinic) => clinic.id !== clinicId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  
  return (
    <>
      <div className=" pb-8 px-4 md:ps-[16rem]">
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
            إدارة المحافظات والعيادات والمراكز
          </h2>
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full mb-4"
            placeholder="اسم المحافظة"
            value={locationData.province}
            onChange={(e) =>
              setLocationData({ ...locationData, province: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full mb-4"
            placeholder="اسم العيادة"
            value={locationData.clinic}
            onChange={(e) =>
              setLocationData({ ...locationData, clinic: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full mb-4"
            placeholder="اسم المركز"
            value={locationData.center}
            onChange={(e) =>
              setLocationData({ ...locationData, center: e.target.value })
            }
          />
          <button
            onClick={handleAddLocation}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
          >
            إضافة موقع جديد
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            المواقع المضافة
          </h2>
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4"></th>
                <th className="py-3 px-4">المحافظة</th>
                <th className="py-3 px-4">العيادة</th>
                <th className="py-3 px-4">المركز</th>
                <th className="py-3 px-5">حذف</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic,length) => (
                <tr key={clinic.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{length+1}</td>
                  <td className="py-3 px-4">
                    {provinces.find((p) => p.id === clinic.provinceId)?.name ||
                      "غير معروف"}
                  </td>
                  <td className="py-3 px-4">{clinic.name}</td>
                  <td className="py-3 px-4">
                    {centers
                      .filter((c) => c.clinicId === clinic.id)
                      .map((c) => c.name)
                      .join(", ") || "غير معروف"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteClinic(clinic.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
      <AdminServices />
    </>
  );
};

export default ServiceTable;
