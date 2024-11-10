import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from "@material-tailwind/react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-[4rem] px-4 text-center bg-gray-50">
      <Typography variant="h1" color="blue" className="font-bold mb-4">
        404
      </Typography>
      <Typography variant="h5" color="gray" className="mb-6">
        الصفحة التي تحاول الوصول إليها غير موجودة
      </Typography>
      <Typography variant="paragraph" color="gray" className="mb-6 max-w-lg">
        ربما تكون قد كتبت الرابط بشكل خاطئ أو تم نقل الصفحة إلى مكان آخر.
      </Typography>
      <Link to="/">
        <Button color="blue" size="lg" className="rounded-md">
          العودة إلى الصفحة الرئيسية
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
