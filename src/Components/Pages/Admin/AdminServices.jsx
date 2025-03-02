import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [advice, setAdvice] = useState([]);
  const [serviceData, setServiceData] = useState({ name: "", description: "" });
  const [adviceData, setAdviceData] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesSnapshot = await getDocs(collection(db, "services"));
        setServices(
          servicesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const adviceSnapshot = await getDocs(collection(db, "tips"));
        setAdvice(
          adviceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      await deleteDoc(doc(db, type, id));
      if (type === "services")
        setServices(services.filter((service) => service.id !== id));
      else setAdvice(advice.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleAdd = async (type, data, setData, setList) => {
    if (!Object.values(data).every(Boolean)) return;
    try {
      const ref = await addDoc(collection(db, type), data);
      setList((prev) => [...prev, { id: ref.id, ...data }]);
      setData(Object.fromEntries(Object.keys(data).map((key) => [key, ""])));
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  return (
    <div className=" pb-8 px-4 md:ps-[16rem]">
      {[
        {
          title: "الخدمات الطبية",
          type: "services",
          data: serviceData,
          setData: setServiceData,
          list: services,
          setList: setServices,
        },
        {
          title: "النصائح الطبية",
          type: "tips",
          data: adviceData,
          setData: setAdviceData,
          list: advice,
          setList: setAdvice,
        },
      ].map(({ title, type, data, setData, list, setList }) => (
        <div key={type} className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            إدارة {title}
          </h2>
          <input
            type="text"
            className="border border-gray-300 py-2 px-4 rounded w-full mb-4"
            placeholder={`عنوان ${title}`}
            value={data[Object.keys(data)[0]]}
            onChange={(e) =>
              setData({ ...data, [Object.keys(data)[0]]: e.target.value })
            }
          />
          <textarea
            className="border border-gray-300 py-2 px-4 rounded w-full mb-4"
            placeholder={`وصف ${title}`}
            value={data[Object.keys(data)[1]]}
            onChange={(e) =>
              setData({ ...data, [Object.keys(data)[1]]: e.target.value })
            }
          />
          <button
            onClick={() => handleAdd(type, data, setData, setList)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
          >
            إضافة {title}
          </button>
          <table className="w-full border border-gray-300 text-left mt-4">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {Object.keys(data).map((key) => (
                  <th key={key} className="py-3 px-4">
                    {key}
                  </th>
                ))}
                <th className="py-3 px-5">حذف</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  {Object.values(item)
                    .slice(1)
                    .map((value, index) => (
                      <td key={index} className="py-3 px-4">
                        {value}
                      </td>
                    ))}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(item.id, type)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminServices;
