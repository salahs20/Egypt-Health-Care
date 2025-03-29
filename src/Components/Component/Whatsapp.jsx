import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  const phoneNumber = "201557777869"; // ضع رقمك هنا
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };
  return (
    <div className=" bottom-[15px]  right-[15px] z-50 fixed">
      <div className="">
        <p
          onClick={handleClick}
          className=" text-[50px] cursor-pointer text-green-600 "
        >
          <FaWhatsapp />
        </p>
      </div>
    </div>
  );
};

export default Whatsapp;
