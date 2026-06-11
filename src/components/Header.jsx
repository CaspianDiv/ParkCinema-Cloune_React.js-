import logo from "../assets/logo.svg";

import Slider from "./Slider";

import { useEffect, useState } from "react";

import azFlag from "../assets/az-flag.svg";

import enFlag from "../assets/en-flag.svg";

import ruFlag from "../assets/ru-flag.svg";

import { IoIosArrowDown } from "react-icons/io";

import { Link, NavLink, useLocation } from "react-router-dom";

import { BsSun } from "react-icons/bs";

import { GoMoon } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [statusSelect, setStatusSelect] = useState(true);

  const {userJson , logout} = useAuth();

  const [isOpen , setIsOpen] = useState(false);

  const [theme , setTheme] = useState(true);
  
  
  const [flag, setFlag] = useState({ img: azFlag, text: "AZE" });
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/movies/");

  function customSelect() {
    setStatusSelect(!statusSelect);
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light")
  },[])

  if (theme && theme === "dark") {
    document.documentElement.classList.add("dark")
  }else if(theme && theme === "light"){
    document.documentElement.classList.remove("light")
  };

  function handleTheme(theme) {
    localStorage.setItem("theme" , theme)
    document.documentElement.classList.toggle("dark");
    setTheme(theme);
  };



  return (
    <>
      <div className="relative w-full dark:bg-[#373737] bg-red-950 p-10 md:p-0">
          {!isDetailPage &&  <Slider /> }
        <nav className="absolute top-0 left-0 w-full z-50 py-2">
          <div className="px-4 md:px-16 flex items-center md:justify-between justify-center gap-5 h-14 md:h-16">
            <div className="flex items-center justify-center gap-6 md:gap-20">
                <Link to={"/movies"}>
                    <img src={logo} className="w-28 md:w-36 cursor-pointer" alt="logo parkcinema" />
                </Link>
              <ul className="hidden md:flex items-center gap-8 lg:gap-20">
                <li className="cursor-pointer text-[#C2C2C3] transition-all duration-300 hover:text-[#c3281d] whitespace-nowrap text-sm lg:text-base">
                  Kinoteatrlar
                </li>
                <li className="cursor-pointer text-[#C2C2C3] transition-all duration-300 hover:text-[#c3281d] whitespace-nowrap text-sm lg:text-base">
                  Aksiyalar
                </li>
                <li className="cursor-pointer text-[#C2C2C3] transition-all duration-300 hover:text-[#c3281d] whitespace-nowrap text-sm lg:text-base">
                  FAQ
                </li>
                <li className="cursor-pointer text-[#C2C2C3] transition-all duration-300 hover:text-[#c3281d] whitespace-nowrap text-sm lg:text-base">
                  Əlaqə
                </li>
                <NavLink to={"/movies/sign-in"} className="cursor-pointer transition-all text-[#C2C2C3] duration-300  hover:text-[#c3281d] whitespace-nowrap text-sm lg:text-base">
                  {
                    userJson ? 
                    "" :
                    "Profil"
                  }
                </NavLink>
                <div className="relative">
                { userJson &&
                  <FaRegUser onClick={() => setIsOpen(!isOpen)} size={25} className="text-[#A7A4A3] cursor-pointer" /> }
                 {isOpen && userJson &&
                   <div className="absolute p-5 rounded flex flex-col gap-5 top-full left-full translate-x-[-60%] bg-gray-200">
                    <p className="hover:underline"><Link to={"userDashboard"}>Profil</Link></p>
                    <p>{userJson?.email}</p>
                    <p className="cursor-pointer hover:underline"><Link to={"userDashboard"}>Şəxsi Kabinet</Link></p>
                    <button onClick={logout} className="bg-[red] p-3 rounded text-white cursor-pointer mt-5">Çıxış</button>
                  </div>}
                </div>
              </ul>
            </div>
            <div className="hidden sm:flex md:flex gap-4 relative">

              <div
                onClick={customSelect}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={flag.img} alt="flag" className="w-6 h-6" />
                
                <p className="text-white text-sm lg:text-base whitespace-nowrap">
                  {flag.text}
                </p>
                <IoIosArrowDown size={18} className="text-white" />
              </div>
            <div> 
              { theme === "dark" ?  <BsSun onClick={() => handleTheme("light")} className="text-[#BFBFBF] cursor-pointer" size={25} /> : <GoMoon onClick={() => handleTheme("dark")} className="cursor-pointer text-[#BFBFBF]" size={25} />}
            </div>
              {!statusSelect && (
                <ul className="text-white absolute top-8 right-0 w-20 z-50">
                  <div className="bg-[#DBD9D9] rounded shadow-lg">
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setFlag({ img: azFlag, text: "AZE" });
                        customSelect();
                      }}
                    >
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-400">
                        <img src={azFlag} alt="" className="w-5" />
                        <p className="text-black text-sm">AZE</p>
                      </div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setFlag({ img: enFlag, text: "EN" });
                        customSelect();
                      }}
                    >
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-400">
                        <img src={enFlag} alt="" className="w-5" />
                        <p className="text-black text-sm">EN</p>
                      </div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setFlag({ img: ruFlag, text: "RU" });
                        customSelect();
                      }}
                    >
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-400">
                        <img src={ruFlag} alt="" className="w-5" />
                        <p className="text-black text-sm">RU</p>
                      </div>
                    </li>
                  </div>
                </ul>
              )}
              
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
