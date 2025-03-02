import React, { useState, useEffect, useRef } from "react";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

const Avatar = ({ handleMobileItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // إغلاق القائمة المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    // إضافة مستمع الحدث عند فتح القائمة
    document.addEventListener("click", handleClickOutside);

    // تنظيف المستمع عند التدمير
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center space-x-4 px-2">
      {/* Avatar */}
      <div
        ref={avatarRef}
        className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
        onClick={toggleDropdown}
      >
        {/* Display the first letter of the name or any initials */}
        {"S"}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 right-0 w-40 bg-white shadow-lg rounded-lg border border-gray-300 z-10"
        >
          <ul>
            <Link to='/admin/*'><div className="text-[12px] text-center text-red-500">Admin</div></Link>
            {/* <Link
              to="/userDashboard" // تأكد من إضافة رابط كامل إلى صفحة لوحة التحكم
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleMobileItemClick(false);
                setIsOpen(false); // غلق القائمة بعد الضغط
              }}
            >
              الملف الشخصي
            </Link> */}

            <li
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleMobileItemClick(false);
                setIsOpen(false); // غلق القائمة بعد الضغط
              }}
            >
              <div className=" flex  items-center gap-1">
                <BiLogOut />
                <span> تسجيل الخروج</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;
