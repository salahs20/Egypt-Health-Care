import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editService, setEditService] = useState(null);
  const [services, setServices] = useState([]);

  const apiUrl = import.meta.env.VITE_Url; // استبدل هذا بعنوان API الخاص بك

  useEffect(() => {
    // جلب الخدمات من API عند تحميل المكون
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/services`);
        setServices(response.data);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذه الخدمة؟")) {
      try {
        await axios.delete(`${apiUrl}/services/${serviceId}`);
        setServices(services.filter((service) => service.id !== serviceId));
      } catch (err) {
        console.error("خطأ في حذف الخدمة:", err);
      }
    }
  };

  const handleAddService = async () => {
    const newService = { title: "", description: "" };

    try {
      const response = await axios.post(`${apiUrl}/services`, newService);
      setServices([...services, response.data]);
    } catch (err) {
      console.error("خطأ في إضافة الخدمة:", err);
    }
  };

  const handleEditService = (service) => {
    setEditService(service);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/services/${editService.id}`,
        editService
      );
      setServices(
        services.map((service) =>
          service.id === editService.id ? response.data : service
        )
      );
      setEditService(null);
    } catch (err) {
      console.error("خطأ في تعديل الخدمة:", err);
    }
  };

  return (
    <div className="pt-16 pb-8 px-4 md:ps-[16rem]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          إدارة الخدمات
        </h2>

        {/* البحث */}
        <div className="mb-6">
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full"
            placeholder="ابحث عن خدمة"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* زر إضافة خدمة */}
        <button
          onClick={handleAddService}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
        >
          إضافة خدمة جديدة
        </button>

        <p>عدد الخدمات: {filteredServices.length}</p>

        {/* جدول الخدمات */}
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
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{service.title}</td>
                  <td className="py-3 px-4">{service.description}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEditService(service)}
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

        {/* نافذة تعديل الخدمة */}
        {editService && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">تعديل الخدمة</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium" >اسم الخدمة</label>
                <input
                  type="text"
                  className="border border-gray-300 py-2 px-4 w-full rounded"
                  value={editService.title}
                  onChange={(e) =>
                    setEditService({ ...editService, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">الوصف</label>
                <textarea
                  className="border border-gray-300 py-2 px-4 w-full rounded"
                  value={editService.description}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditService(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  حفظ التعديلات
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceTable;
