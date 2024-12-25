import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../Imag/أحمد-عماد32-copy.png";
import Avatar from "./Avatar";
import { IoHomeOutline } from "react-icons/io5";

const HeaderAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // حالة لفتح/إغلاق الدروب داون
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMedicalInfoOpen, setIsMedicalInfoOpen] = useState(false);

  const closeDropdowns = () => {
    setIsServicesOpen(false);
    setIsMedicalInfoOpen(false);
  };

  const handleMobileItemClick = () => {
    setIsOpen(false);
    closeDropdowns();
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) setIsDropdownOpen(false); // إغلاق الـ dropdown إذا تم النقر خارجها
    };
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav className="bg-blue-700 shadow-md fixed w-full z-50 top-0">
      <div className="pe-3 ps-3 mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo Section */}
        <Link to="/" className="p-2">
          <img src={logo} alt="" className="w-[50px] h-[35px]" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center flex-row-reverse">
          <Link to="/" className="text-white hover:text-gray-200">
            <IoHomeOutline className="text-xl " />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden mt-2 w-full bg-blue-700`}
        >
          <Link
            to="/"
            className="block text-white py-2 px-4 hover:bg-blue-600"
            onClick={handleMobileItemClick}
          >
       <IoHomeOutline className="text-xl " />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeaderAdmin;
