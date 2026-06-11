import { BsTrash } from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { IMaskInput } from "react-imask";
import DateComponent from "../components/DateComponent";
import { useAuth } from "../context/authContext";

function UserDashboard() {

    const {userJson , logout} = useAuth();
      const radioStyle = {
        color: "#9CA3AF",
        "&.Mui-checked": {
        color: "#D52B1E"
        }
  };
    
    return(
        <>
            <div className="h-screen">
                <div className="p-[200px_80px] flex flex-col gap-5">
                <p className="text-[#A7A4A3] text-xl pb-10">Şəxsi Məlumatlar</p>
                  <div className="flex gap-10">
                      <div className="flex flex-col gap-5">
                          <p className="uppercase text-gray-200">id</p>
                          <input value={userJson?.id} className="w-50 p-1 bg-white rounded outline-0 border-gray-300" readOnly type="number" />
                          <p className="capitalize text-gray-200">ad</p>
                          <input value={userJson?.firstName} className="w-50 p-1 bg-white rounded outline-0 border-gray-300" readOnly type="text" />
                          <p className="capitalize text-gray-200">cins</p>
                             <div>
                                          
                                      <FormControlLabel
                                      value={userJson?.kişi ? "kişi" : "qadın"}
                                      name="kişi"
                                      control={
                                      <Radio
                                          sx={radioStyle} 
                                      />
                                      }
                                      label="Kişi"
                                      sx={{color: "white"}}
                                  />
                              </div>
                      </div>
                      <div className="flex flex-col gap-5">
                          <p className="text-gray-200">E-Poçt</p>
                          <input value={userJson?.email} className="w-50 p-1 bg-white rounded outline-0 border-gray-300" readOnly type="email" />
                          <p className="capitalize text-gray-200">soyad</p>
                          <input value={userJson?.lastName} className="w-50 p-1 bg-white rounded outline-0 border-gray-300" readOnly type="text" />
                          <p className="capitalize text-gray-200">telefon</p>
                           <div className="flex items-center gap-2 relative">
                            <span className="text-white border-b leading-10 absolute left-0">+994</span>
                            <IMaskInput
                            readOnly
                            className="text-white placeholder:text-[#9CA3AF] outline-0 border-b px-10 border-[#D9DADB] w-full leading-10"
                            mask="00 000  00  00"
                            value={userJson?.phone}
                            placeholder="50 123 32 24"
                            name="phone"
                            />
                        </div>
                      </div>
                      <div className="flex flex-col gap-5">
                          <p className="text-gray-200 capitalize">doğum tarixi</p>
                          <input value={userJson?.birthDate} className="bg-white p-2 rounded outline-none" readOnly type="date" />
                      </div>
                  </div>
                        <div className="pt-5 flex items-center gap-10">
                            <button onClick={logout} className="flex gap-3 items-center cursor-pointer">
                                <BsTrash size={25} className="text-[#D52B1E]" />
                                <p className="text-[#D52B1E]">Hesabı sil</p>
                            </button>
                            <button onClick={logout} className="cursor-pointer text-[#D52B1E] flex items-center gap-3"><IoIosLogOut size={25} /> <Link to={"/movies/sign-in"}>Çıxış</Link></button>
                        </div>
                </div>
            </div>
        </>
    )
};

function PrivateRoute({ children }) {
    const {userJson} = useAuth();

    return(
        <>
            {
                userJson ? children : <Navigate to={"/movies/sign-in"} />
            }
        </>
    )
};


export default UserDashboard