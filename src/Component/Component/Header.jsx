import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../Imag/أحمد-عماد32-copy.png";
import Avatar from "./Avatar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // حالة لفتح/إغلاق الدروب داون
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
      if (isDropdownOpen) setIsDropdownOpen(false);  // إغلاق الـ dropdown إذا تم النقر خارجها
    };
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav className="bg-blue-700 shadow-md fixed w-full z-50 top-0">
      <div className="pe-3 ps-3 mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo Section */}
        <Link to="/" className="p-2">
          <img src={logo} alt="" className="w-[50px] h-[40px]" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center flex-row-reverse">
          <div className="relative">
            {/* Avatar and Dropdown */}
            <Avatar onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  الملف الشخصي
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  تسجيل الخروج
                </Link>
              </div>
            )}
          </div>

          <Link to="/" className="text-white hover:text-gray-200">
            رئيسية
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
              <span>خدمات طبية</span>
              <MdArrowDropDown />
            </button>
            {isServicesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/services/consultations"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  Consultations
                </Link>
                <Link
                  to="/services/dental-care"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  Dental Care
                </Link>
                <Link
                  to="/services/surgery"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  Surgery
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
                  to="/info/health-tips"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  Health Tips
                </Link>
                <Link
                  to="/info/disease-prevention"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  Disease Prevention
                </Link>
                <Link
                  to="/info/medications"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdowns}
                >
                  Medications
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
          <Link to="/Login" className="text-white hover:text-gray-200">
            تسجيل الدخول
          </Link>{" "}
          <Link to="/signup" className="text-white hover:text-gray-200">
            انشاء حساب
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
          <div className="flex justify-end p-4 ">
            <Avatar  handleMobileItemClick={handleMobileItemClick}/>
          </div>

          <Link
            to="/"
            className="block text-white py-2 px-4 hover:bg-blue-600"
            onClick={handleMobileItemClick}
          >
            رئيسية
          </Link>

          {/* Mobile Services Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
              }}
              className=" text-white py-2 px-4 hover:bg-blue-600 w-full text-left focus:outline-none flex items-center"
            >
              <span>خدمات طبية</span>
              <MdArrowDropDown />
            </button>
            {isServicesOpen && (
              <div className="mt-2 space-y-2 bg-blue-gray-500 rounded-md">
                <Link
                  to="/services/consultations"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={handleMobileItemClick}
                >
                  Consultations
                </Link>
                <Link
                  to="/services/dental-care"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={handleMobileItemClick}
                >
                  Dental Care
                </Link>
                <Link
                  to="/services/surgery"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={handleMobileItemClick}
                >
                  Surgery
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
              <div className="mt-2 space-y-2 bg-blue-gray-500 rounded-md">
                <Link
                  to="/info/health-tips"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={handleMobileItemClick}
                >
                  Health Tips
                </Link>
                <Link
                  to="/info/disease-prevention"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={handleMobileItemClick}
                >
                  Disease Prevention
                </Link>
                <Link
                  to="/info/medications"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={handleMobileItemClick}
                >
                  Medications
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
            className="block text-white py-2 px-4 hover:bg-blue-600"
            onClick={handleMobileItemClick}
          >
            احجز موعد
          </Link>
          <Link
            to="/Login"
            className="block text-white py-2 px-4 hover:bg-blue-600"
            onClick={handleMobileItemClick}
          >
            تسجيل الدخول
          </Link>
          <Link
            to="/signup"
            className="block text-white py-2 px-4 hover:bg-blue-600"
            onClick={handleMobileItemClick}
          >
            انشاء حساب
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
