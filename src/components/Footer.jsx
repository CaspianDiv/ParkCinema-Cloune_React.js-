import {  useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import visa from "../assets/Visa.svg";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebook, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import SideBar from "./SideBar";
import { IoIosArrowUp } from "react-icons/io";

function Footer() {
  const [statusSideBar, setStatusSideBar] = useState(false);
  const [showArrow , setShowArrow] = useState(false);


  function handleSideBar() {
    setStatusSideBar(!statusSideBar);
  };

  useEffect(() => {
      const handleScroll = () => {
          if (window.pageYOffset > 400) {
              setShowArrow(false)
          }else {
            setShowArrow(true)
          }
      };

      window.addEventListener("scroll" , handleScroll);

      return () => window.removeEventListener("scroll" , handleScroll);
  },[]);

  function handleUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (
    <>
          <div className="container-md bg-[#86312A] p-10 flex flex-wrap justify-between items-center relative">
            <div className="flex flex-col gap-10 items-center">
              <img
                src={logo}
                className="w-40 cursor-pointer"
                alt="parkcinema logo svg"
              />
              <p className="capitalize text-[#D9DADB]">
                &copy; park cinema,2026
              </p>
            </div>
            <div className="flex gap-3 flex-col">
              <p className="capitalize text-[#D9DADB] cursor-pointer hover:text-[#feffff]">
                kinoteatrlar
              </p>
              <p className="capitalize text-[#D9DADB] cursor-pointer hover:text-[#feffff]">
                askiyalar
              </p>
              <p className="uppercase text-[#D9DADB] cursor-pointer hover:text-[#feffff]">faq</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="capitalize cursor-pointer text-[#D9DADB] hover:text-[#feffff]">profil</p>
              <p className="capitalize cursor-pointer text-[#D9DADB] hover:text-[#feffff]">əlaqə</p>
              <p className="capitalize cursor-pointer text-[#D9DADB] hover:text-[#feffff]">
                hüquqi şərtlər
              </p>
            </div>
            <div>
              <p className="cursor-pointer text-[#D9DADB]">Bizi izləyin</p>
              <div className="p-3 flex items-center gap-2">
                <div className="p-2 rounded-[100%]  bg-[#D9DADB] cursor-pointer">
                  <BiLogoInstagramAlt
                    className="text-[#D52B1E] m-auto"
                    size={30}
                  />
                </div>
                <div className="p-2 rounded-[100%]  bg-[#D9DADB] cursor-pointer">
                  <FaFacebook className="text-[#D52B1E] m-auto" size={30} />
                </div>
                <div className="p-2 rounded-[100%]  bg-[#D9DADB] cursor-pointer">
                  <FaYoutube className="text-[#D52B1E] m-auto" size={30} />
                </div>
                <div className="p-2 rounded-[100%]  bg-[#D9DADB] cursor-pointer">
                  <FaTelegram className="text-[#D52B1E] m-auto" size={30} />
                </div>
                <div className="p-2 rounded-[100%]  bg-[#D9DADB] cursor-pointer">
                  <FaTiktok className="text-[#D52B1E] m-auto" size={30} />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10">
              <div>
                <img src={visa} alt="" className="cursor-pointer" />
              </div>
              <div>
                <p className="cursor-pointer text-[#D9DADB]">
                  ESAM Innovations
                </p>
              </div>
            </div>
          </div>
    {  !showArrow &&
            <div onClick={handleUp} className="fixed cursor-pointer z-100 right-5 bottom-10 p-3 hover:bg-white hover:text-[#A9231E] transition-color duration-300 ease-in-out  rounded-full text-white bg-[#A9231E]">
              <IoIosArrowUp size={35} />
          </div>}
          <div className="relative">
            <div className="md:hidden absolute py-2 px-3 left-10 bottom-15 bg-[#A9231E] rounded-full border border-white">
              <button
                onClick={handleSideBar}
                className="cursor-pointer text-[#D9DADB]"
              >
                <RxHamburgerMenu size={30} />
              </button>
            </div>
          </div>
        <SideBar 
          statusSideBar={statusSideBar}
          setStatusSideBar={setStatusSideBar}
        />
    </>
  );
}

export default Footer;
