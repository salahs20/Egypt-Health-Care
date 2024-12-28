import React from "react";
import Slider from "react-slick";

// Data for hospitals, clinics, and pharmacies
const hospitals = [
  {
    name: "مستشفى القاهرة الدولي",
    img: "https://via.placeholder.com/200x150?text=مستشفى+القاهرة",
  },
  {
    name: "مستشفى النيل",
    img: "https://via.placeholder.com/200x150?text=مستشفى+النيل",
  },
  {
    name: "عيادة الفراعنة",
    img: "https://via.placeholder.com/200x150?text=عيادة+الفراعنة",
  },
  {
    name: "عيادة النخبة",
    img: "https://via.placeholder.com/200x150?text=عيادة+النخبة",
  },
  {
    name: "صيدلية التوحيد",
    img: "https://via.placeholder.com/200x150?text=صيدلية+التوحيد",
  },
  {
    name: "صيدلية المدينة",
    img: "https://via.placeholder.com/200x150?text=صيدلية+المدينة",
  },
  {
    name: "مستشفى الحرمين",
    img: "https://via.placeholder.com/200x150?text=مستشفى+الحرمين",
  },
  {
    name: "مستشفى الأزهر",
    img: "https://via.placeholder.com/200x150?text=مستشفى+الأزهر",
  },
  {
    name: "عيادة الطب الحديث",
    img: "https://via.placeholder.com/200x150?text=عيادة+الطب+الحديث",
  },
  {
    name: "صيدلية الشفاء",
    img: "https://via.placeholder.com/200x150?text=صيدلية+الشفاء",
  },
];

const Scrollbar = () => {
  const settings = {
    infinite: true, // Infinite scrolling
    speed: 1500, // Scroll speed
    slidesToShow: 3, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per action
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay speed (2000ms)
    arrows: false, // Hide arrows
    responsive: [
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
        },
      },
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile screens
        },
      },
    ],
  };

  return (
    <div className="pb-10 ">
   
        <Slider {...settings}>
          {hospitals.map((hospital, index) => (
            <div key={index} className="text-center ">
              <img
                src={hospital.img}
                alt={hospital.name}
                className="w-screen h-40 object-cover rounded-lg shadow-md ps-1 pe-1 md:pe-0"
              />
              <h3 className="mt-2 text-lg font-medium">{hospital.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
   
  );
};

export default Scrollbar;
