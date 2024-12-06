import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-4 text-center bg-gray-50">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        الصفحة التي تحاول الوصول إليها غير موجودة
      </h2>
      <p className="text-lg text-gray-600 mb-6 max-w-lg">
        ربما تكون قد كتبت الرابط بشكل خاطئ أو تم نقل الصفحة إلى مكان آخر.
      </p>
      <Link to="/">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
          العودة إلى الصفحة الرئيسية
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
