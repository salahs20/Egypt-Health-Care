import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../Imag/logo.png";
import Avatar from "./Avatar";
import { TbLogin2 } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
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

        <div className="hidden md:flex space-x-6 items-center flex-row-reverse">
          <div className="relative"></div>
          <Link to="/" className="text-white hover:text-gray-200 pe-4">
            <IoHomeOutline className="text-xl text-" />
          </Link>
          {/* Services Dropdown */}
          <div className="relative " onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                closeDropdowns();
                setIsServicesOpen(!isServicesOpen);
              }}
              className="text-white hover:text-gray-200 focus:outline-none flex items-center"
            >
              <span>الخدمات الصحية</span>
              <MdArrowDropDown />
            </button>
            {isServicesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/Clinics"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  عيادات
                </Link>
                <Link
                  to="/Centers"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  مراكز{" "}
                </Link>
              </div>
            )}
          </div>
          {/* Medical Info Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                closeDropdowns();
                setIsMedicalInfoOpen(!isMedicalInfoOpen);
              }}
              className="text-white hover:text-gray-200 focus:outline-none flex items-center"
            >
              <span>معلومات طبية</span>
              <MdArrowDropDown />
            </button>
            {isMedicalInfoOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/healthTips"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  Health Tips
                </Link>
              </div>
            )}
          </div>
          <Link to="/services" className="text-white hover:text-gray-200">
            خدماتنا
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-200">
            احجز موعد
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
            <IoHomeOutline className="text-xl text-" />
          </Link>

          {/* Mobile Services Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
              }}
              className=" text-white py-2 px-4 hover:bg-blue-600 w-full text-left focus:outline-none flex items-center"
            >
              <span>الخدمات الصحية</span>
              <MdArrowDropDown />
            </button>
            {isServicesOpen && (
              <div className="mt-2 space-y-2 bg-blue-900 rounded-md">
                <Link
                  to="/Clinics"
                  className="block px-8 pt-2 text-gray-200 hover:bg-gray-500 text-[15px]"
                  onClick={handleMobileItemClick}
                >
                  عيادات
                </Link>
                <Link
                  to="/Centers"
                  className="block px-8 pb-2 text-gray-200 hover:bg-gray-500 text-[15px]"
                  onClick={handleMobileItemClick}
                >
                  مراكز
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Medical Info Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setIsMedicalInfoOpen(!isMedicalInfoOpen);
              }}
              className=" text-white py-2 px-4 hover:bg-blue-600 w-full text-left focus:outline-none flex items-center"
            >
              <span>معلومات طبية</span>
              <MdArrowDropDown />
            </button>
            {isMedicalInfoOpen && (
              <div className="mt-2 space-y-2 bg-blue-900 rounded-md">
                <Link
                  to="/healthTips"
                  className="block px-8 py-2 text-gray-200 hover:bg-gray-500 text-[15px]"
                  onClick={handleMobileItemClick}
                >
                  Health Tips
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/services"
            className="block text-white py-2 px-4 hover:bg-blue-600"
            onClick={handleMobileItemClick}
          >
            خدماتنا
          </Link>
          <Link
            to="/contact"
            className="block text-white  py-2 px-4 text-[14px] hover:bg-blue-600"
            onClick={handleMobileItemClick}
          >
            احجز موعد
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
