import React, { useState } from "react";

const ServiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editService, setEditService] = useState(null);

  // Static services data
  const [services, setServices] = useState([
    { id: 1, name: "خدمة 1" },
    { id: 2, name: "خدمة 2" },
    { id: 3, name: "خدمة 3" },
  ]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteService = (serviceId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذه الخدمة؟")) {
      setServices(services.filter((service) => service.id !== serviceId));
    }
  };

  const handleAddService = () => {
    const newService = { id: services.length + 1, name: "خدمة جديدة" };
    setServices([...services, newService]);
  };

  const handleEditService = (service) => {
    setEditService(service);
  };

  const handleSaveEdit = () => {
    setServices(
      services.map((service) =>
        service.id === editService.id ? editService : service
      )
    );
    setEditService(null);
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
                <th className="py-3 px-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{service.name}</td>
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
                <label className="block text-sm font-medium">اسم الخدمة</label>
                <input
                  type="text"
                  className="border border-gray-300 py-2 px-4 w-full rounded"
                  value={editService.name}
                  onChange={(e) =>
                    setEditService({ ...editService, name: e.target.value })
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
