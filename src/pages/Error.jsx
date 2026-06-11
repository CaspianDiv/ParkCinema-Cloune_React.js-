import { GiExitDoor } from "react-icons/gi"; 
import errorPg from "../assets/404.png";
import { Link } from "react-router-dom";

function Error() {

  return (
    <>
      <div className="flex h-dvh relative overflow-y-hidden justify-center items-center">
        <div className="absolute text-center z-50 top-[48%] left-[50%] translate-[-50%]">
            <h1 className="text-[120px] text-[#555555] font-medium">404</h1>
            <p className="text-[#565656] text-[38px] font-semibold">Bu səhifə tapılmadı</p>  
        </div>
        <div className="absolute top-180">
         <Link to={"/movies"}>
           <button className="text-white bg-[#00773C] flex gap-5 p-[7px_25px] rounded cursor-pointer">
             Ana səhifəyə qayıt
             <GiExitDoor size={25} />
           </button>
         </Link>
 
        </div>
        <img src={errorPg} alt="" />  
      </div>
    </>
  );
}

export default Error;
