import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMedicalInfoOpen, setIsMedicalInfoOpen] = useState(false);

  const closeDropdowns = () => {
    setIsServicesOpen(false);
    setIsMedicalInfoOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => closeDropdowns();
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-700 p-4 shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo Section */}
        <Link to="/" className="text-white text-2xl font-semibold">
          EHC
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-200">
            رئيسية
          </Link>

          {/* Services Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
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
          <Link to="/" className="block text-white py-2 px-4 hover:bg-blue-600">
            رئيسية
          </Link>

          {/* Mobile Services Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                closeDropdowns();
                setIsServicesOpen(!isServicesOpen);
              }}
              className=" text-white py-2 px-4 hover:bg-blue-600 w-full text-left focus:outline-none flex items-center"
            >
              <span>خدمات طبية</span>
              <MdArrowDropDown />
            </button>
            {isServicesOpen && (
              <div className="mt-2 space-y-2 bg-blue-600 rounded-md">
                <Link
                  to="/services/consultations"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={closeDropdowns}
                >
                  Consultations
                </Link>
                <Link
                  to="/services/dental-care"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={closeDropdowns}
                >
                  Dental Care
                </Link>
                <Link
                  to="/services/surgery"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={closeDropdowns}
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
                closeDropdowns();
                setIsMedicalInfoOpen(!isMedicalInfoOpen);
              }}
              className=" text-white py-2 px-4 hover:bg-blue-600 w-full text-left focus:outline-none flex items-center"
            >
              <span>معلومات طبية</span>
              <MdArrowDropDown />
            </button>
            {isMedicalInfoOpen && (
              <div className="mt-2 space-y-2 bg-blue-600 rounded-md">
                <Link
                  to="/info/health-tips"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={closeDropdowns}
                >
                  Health Tips
                </Link>
                <Link
                  to="/info/disease-prevention"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={closeDropdowns}
                >
                  Disease Prevention
                </Link>
                <Link
                  to="/info/medications"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-500"
                  onClick={closeDropdowns}
                >
                  Medications
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/services"
            className="block text-white py-2 px-4 hover:bg-blue-600"
          >
            خدماتنا
          </Link>
          <Link
            to="/contact"
            className="block text-white py-2 px-4 hover:bg-blue-600"
          >
            احجز موعد
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
