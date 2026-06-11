import { Swiper, SwiperSlide } from "swiper/react";
import navBG from "../assets/nav-bg.svg"; 

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { getMoviesSlider } from "../services/MoviesServices";
import { IoIosArrowForward } from "react-icons/io";

function Slider() {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    getMoviesSlider().then((item) => setSliderData(item));
  }, []);

  return (
    <>
      <div className="relative w-full h-full overflow-hidden lg:m-0 xl:m-0 mt-5 md:m-0">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          key={sliderData.length}
          navigation={{ nextEl: ".my-custom-next-button", prevEl: null }}
          observer={true}
          observeParents={true}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper w-full h-full"
        >
          {sliderData[0] &&
            Object.keys(sliderData[0]).map((key, i) => (
              <SwiperSlide key={i}>
                <img src={sliderData[0][key]} />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="absolute top-0 right-0 md:right-0 lg:right-0 xl:right-0 z-40 brightness-90 opacity-50 pointer-events-none h-full">
          <img
            src={navBG}
            alt="nav bg svg"
            className="h-full w-auto md:w-30 lg:w-30 xl:2-30 object-contain object-right"
          />
        </div>

        {/* ─── Forward arrow - svg-in üstündə ─── */}
        <div
          style={{ pointerEvents: "auto" }}
          className="my-custom-next-button absolute  right-2 top-1/2 -translate-y-1/2 z-50 outline-none cursor-pointer"
        >
          <IoIosArrowForward
            size={50}
            className="cursor-pointer hover:text-red-700 text-gray-400 transition-colors duration-300 drop-shadow-2xl"
          />
        </div>
      </div>
    </>
  );
}

export default Slider;
