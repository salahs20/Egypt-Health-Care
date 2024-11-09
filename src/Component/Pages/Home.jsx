import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      {/* Logo Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
          Egypt Health Care
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          مرحبا بكم في مصر للرعاية الصحية ، شريكك الموثوق للخدمات الطبية
          والمعلومات الصحية. مهمتنا هي تزويدك بخدمات رعاية صحية عالية الجودة
          ومشورة الخبراء بشأن الوقاية من الأمراض والنصائح الصحية وإدارة الأدوية.
          نحن هنا لإرشادك في كل خطوة على الطريق في رحلتك الصحية.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-6">
        <a
          href="/services"
          className="inline-block bg-blue-700 text-white py-2 px-6 rounded-md text-lg hover:bg-blue-600 transition duration-300"
        >
          تصفح خدماتنا
        </a>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} ClinicCare. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
