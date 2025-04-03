import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineClose } from "react-icons/md";

// استيراد الصور وتحويلها إلى قائمة
const images = Object.entries(import.meta.glob("../../Imag/Images/*.jpg", { eager: true })).map(
  ([path, module]) => ({
    name: path.split("/").pop().replace(".jpg", ""), // استخراج اسم الصورة بدون الامتداد
    img: module.default,
  })
);

const HospitalList = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (img) => setSelectedImage(img);
  const closeImage = () => setSelectedImage(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 400,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="pb-10 text-center">
      <Slider {...settings}>
        {images.map((hospital, index) => (
          <div
            key={index}
            className="text-center cursor-pointer"
            onClick={() => openImage(hospital.img)}
          >
            <img
              src={hospital.img}
              alt={hospital.name}
              className="w-screen h-40 object-cover rounded-lg shadow-md"
            />
            <h3 className="mt-2 text-lg font-medium">{hospital.name}</h3>
          </div>
        ))}
      </Slider>
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeImage}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white bg-red-600 px-4 py-2 rounded"
              onClick={closeImage}
            >
              <MdOutlineClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalList;
