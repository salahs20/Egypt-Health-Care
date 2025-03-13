import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ph from "../../Imag/WhatsApp Image 2024-11-10 at 20.54.05_95d6df99.png";
import Scrollbar from "../Component/Scrolbar";
import { motion } from "motion/react"
import ImageUploader from "../UploadImage"; // تأكد من المسار الصحيح
const Home = () => {


<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
/>
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ImageUploader />
    </div>
      <div  className="min-h-screen flex flex-col items-center justify-center md:flex md:flex-row-reverse md:justify-between pt-16 px-4">
        {/* Text Section */}
        <div className="text-3xl mb-8 md:w-1/2 text-center md:text-end w-full animate-fade-in-up">
          <h1 className="font-bold text-blue-600 text-4xl md:text-5xl">
            Egypt Health Care
          </h1>
          <p className="mt-4 text-gray-600 text-lg md:text-xl leading-relaxed">
            مرحبا بكم في مصر للرعاية الصحية ، شريكك الموثوق للخدمات الطبية
            والمعلومات الصحية. مهمتنا هي تزويدك بخدمات رعاية صحية عالية الجودة
            ومشورة الخبراء بشأن الوقاية من الأمراض والنصائح الصحية وإدارة
            الأدوية. نحن هنا لإرشادك في كل خطوة على الطريق في رحلتك الصحية.
          </p>
          {/* Call-to-Action Buttons */}
          <div className="flex justify-center gap-4 mt-6 md:justify-end">
            <Link to="/services">
              <button className="bg-blue-600 text-[20px] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                تصفح خدماتنا
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-blue-600 text-[20px] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                احجز موعد
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center w-full h-full md:w-1/2 animate-scale-in">
          <img src={ph} alt="Healthcare" className="w-2/5 " />
        </div>
      </div>
      <Scrollbar />
    </>
  );
};

export default Home;
