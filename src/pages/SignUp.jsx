import  { useState } from "react";
import { IMaskInput } from "react-imask";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userRegister } from "../services/authServices";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [rePass, setRePass] = useState("");
  const [showEye , setShowEye] = useState(false);
  const [showEye2 , setShowEye2] = useState(false);

  const navigate = useNavigate();
  
  const [user , setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    kişi: null,
    qadın: null,
    email: "",
    password: "" 
  });
  
  
  function handleValues(e) {
    setUser({...user, [e.target.name]: e.target.value})
  };
  

  const radioStyle = {
    color: "#9CA3AF",
    "&.Mui-checked": {
      color: "#D52B1E"
    }
  };

  function userSignUp() {
    if (!user.firstName || !user.lastName || !user.phone || !user.birthDate || !user.email || !user.password) {
      return toast.error("Zəhmət olmasa bütün xanaları doldurun !");
    };

    if (user.password.length < 8) {
      return toast.error("Şifrə 8 xarakterdən az olmamalıdır !")
    };

    if (user.password !== rePass) {
      return toast.error("Şifrələr uyğun gəlmir !")
    };

    const enhUser = {
      ...user,
      role: "user",
      isActive: new Date().toISOString(),
      lastActive: null
    };

    userRegister(enhUser)
    .then(item => {
      console.log(item);
      toast.success("İstifadəçi uğurla qeydiyyatdan keçdi")
      navigate("/movies/sign-in")
    });
  };

  return (
    <>
      <div className="h-screen">
        <div className="pt-30 px-15 capitalize text-[#D9DADB] text-3xl">
          <h1>qeydiyyat</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-10 pt-5 px-5">
            <div className="w-120 flex flex-col gap-5">
              <input
                  value={user.firstName}
                 placeholder="Ad" onChange={handleValues} name="firstName" className="border-b border-b-[#D9DADB] leading-10 placeholder:text-[#7F8A94] text-white outline-0 w-full" type="text" />
              {/* Telefon üçün maskalama */}
              <div className="flex items-center gap-2 relative">
                <span className="text-white border-b leading-10 absolute left-0">+994</span>
                <IMaskInput
                  className="text-white placeholder:text-[#9CA3AF] outline-0 border-b px-10 border-[#D9DADB] w-full leading-10"
                  mask="00 000  00  00"
                  placeholder="50 123 32 24"
                  name="phone"
                  onChange={handleValues}
                />
              </div>
              <input
                  value={user.birthDate}
                  type="date" name="birthDate" onChange={handleValues} className="date-picker outline-0 border-b leading-10 border-[#D9DADB] w-full text-gray-300" />
              <div>
                  <FormControlLabel 
                      value={"kişi"}
                      name="kişi"
                      control={
                        <Radio
                          onChange={handleValues}
                          sx={radioStyle} 
                        />
                      }
                      label="Kişi"
                      sx={{color: "white"}}
                  />
                  <FormControlLabel 
                      value={"qadın"}
                      name="qadın"
                      control={
                        <Radio
                          onChange={handleValues}
                          sx={radioStyle} 
                        />
                      }
                      label="Qadın"
                      sx={{color: "white"}}
                  />
              </div>
            </div>
            <div className="w-120 flex flex-col gap-5">
             <div>
               <input
                  value={user.lastName}
                 placeholder="Soyad" onChange={handleValues} type="text" name="lastName" className="border-b text-white border-[#D9DADB] leading-10 outline-0 w-full placeholder:text-[#7F8A94]" />
             </div>
             <div>
               <input
                  value={user.email}
                 placeholder="Elektron poçt" onChange={handleValues} name="email" type="text" className="border-b text-white border-[#D9DADB] leading-10 outline-0 w-full placeholder:text-[#7F8A94]" />
             </div>
             <div className="relative">
               <input
                  value={user.password}
                 placeholder="Şifrə" name="password" onChange={handleValues} type={showEye ? "text" : "password"} className="border-b text-white border-[#D9DADB] leading-10 outline-0 w-full placeholder:text-[#7F8A94]" />
               <div onClick={() => setShowEye(!showEye)} className="absolute text-[#D9DADB] cursor-pointer top-2 right-2">
                 { showEye ? 
                   <FaEye size={20} /> :
                   <FaEyeSlash size={20} /> }
               </div>
             </div>
             <div className="py-5 relative">
               <input onChange={(e) => setRePass(e.target.value)} placeholder="Şifrəni təsdiqlə" type={showEye2 ? "text" : "password"} className="border-b text-white border-[#D9DADB] leading-10 outline-0 w-full placeholder:text-[#7F8A94]" />
              <div onClick={() => setShowEye2(!showEye2)} className="absolute text-[#D9DADB] cursor-pointer top-7 right-2">
                 { showEye2 ? 
                   <FaEye size={20} /> :
                   <FaEyeSlash size={20} /> }
               </div>
             </div>
             <button onClick={userSignUp} className="bg-[#86312A] rounded-full p-2 text-[#888686] cursor-pointer">Qeydiyyat</button>
             <div className="flex items-center justify-center gap-2">
                <p className="text-[#D9DAD6]">Hesabınız var ?</p>
                <Link to={"/movies/sign-in"}>
                  <p className="cursor-pointer text-white underline">Giriş</p>
                </Link> 
               </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
