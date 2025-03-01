import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase"; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ServiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editService, setEditService] = useState(null);
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, "services"));
      setServices(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذه الخدمة؟")) {
      await deleteDoc(doc(db, "services", serviceId));
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const handleAddService = async () => {
    const newService = { title: "", description: "" };
    const docRef = await addDoc(collection(db, "services"), newService);
    setServices([...services, { id: docRef.id, ...newService }]);
  };

  const handleSaveEdit = async () => {
    const serviceRef = doc(db, "services", editService.id);
    await updateDoc(serviceRef, editService);
    setServices(services.map(service => (service.id === editService.id ? editService : service)));
    setEditService(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);

        if (!Array.isArray(jsonData)) {
          alert("الملف يجب أن يحتوي على قائمة من الخدمات");
          return;
        }

        const formattedServices = jsonData
          .map((item) => ({
            title: item.title?.trim() || "بدون عنوان",
            description: item.description?.trim() || "لا يوجد وصف",
          }))
          .filter((service) => service.title && service.description);

        const addedServices = await Promise.all(
          formattedServices.map(async (service) => {
            const docRef = await addDoc(collection(db, "services"), service);
            return { id: docRef.id, ...service };
          })
        );

        setServices([...services, ...addedServices]);
        alert("تم استيراد البيانات وتنسيقها بنجاح");
      } catch (error) {
        alert("فشل قراءة الملف، تأكد من أنه بصيغة JSON صحيحة");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="pt-16 pb-8 px-4 md:ps-[16rem]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          إدارة الخدمات
        </h2>

        <div className="mb-6">
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="ابحث عن خدمة"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-4 flex gap-4">
          <button
            onClick={handleAddService}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            إضافة خدمة جديدة
          </button>

          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="border border-gray-300 p-2 rounded cursor-pointer"
          />
        </div>

        <p>عدد الخدمات: {services.length}</p>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4">اسم الخدمة</th>
                <th className="py-3 px-4">الوصف</th>
                <th className="py-3 px-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{service.title}</td>
                  <td className="py-3 px-4">{service.description}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setEditService(service)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
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
    </div>
  );
};

export default ServiceTable;