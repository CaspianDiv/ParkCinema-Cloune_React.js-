import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userLogin } from "../services/authServices";
import { useAuth } from "../context/AuthContext";


function Login() {

    const [showEye , setShowEye] = useState(false); 

    const navigate = useNavigate(null);

    const {
      login} = useAuth();
  
  const [user , setUser] = useState({
    email: "",
    password: "" 
  });
  
  
  function handleValues(e) {
    setUser({...user, [e.target.name]: e.target.value})
  };
  
    function userSignIn() {

    if (!user.email || !user.password) {
      return toast.error("Zəhmət olmasa bütün xanaları doldurun !");
    };

    userLogin(user)
    .then(item => {
      console.log(item);
      toast.success("Uğurla giriş olundu !");
      login(item);
      navigate("/movies");
    }
    )
    .catch(() => toast.error(" Email və ya şifrə yanlışdır ! "))
    console.log(user);
    
  };

  return (
    <>
        <div className="h-screen">
            <div className="px-15 py-30">
                <h1 className="capitalize text-[#D9DADB] text-3xl">giriş</h1>
            </div>
            <div className="w-170 flex  flex-col m-auto gap-5 py-15 leading-10">
                <input
                  value={user.email}
                 onChange={handleValues} name="email" placeholder="Elektron poçt" className="w-full py-2 px-2  text-white outline-0 border-b border-b-[#D9DADB]" type="email" />
               <div className="relative">
                 <input
                  value={user.password}
                   onChange={handleValues} name="password" placeholder="Şifrə" className="w-full py-2 px-2  text-white outline-0 border-b bg-transparent border-b-[#D9DADB]" type={showEye ? "text" : "password"} /> 
                  <div onClick={() => setShowEye(!showEye)} className="absolute right-5 top-5">
                   { showEye ? <FaEye size={20} className="cursor-pointer text-[#D9DADB]" /> :  
                     <FaEyeSlash size={20} className="cursor-pointer text-[#D9DADB]" /> }
                </div>
               </div>
               <div>
                  <p className="text-end capitalize text-[#D9DADB] cursor-pointer">şifrəni unutmusuz ?</p>
               </div>
               <div className="py-3">
                <button onClick={userSignIn} className="capitalize text-[#D9DADB] w-full bg-[#9E2F27] transition-colors duration-200 hover:bg-[#c13b31] rounded-full cursor-pointer">giriş</button>
               </div>
               <div className="flex items-center justify-center gap-2">
                <p className="text-[#D9DAD6]">Burada yenisiz ?</p>
                <Link to={"/movies/sign-up"}>
                  <p className="cursor-pointer text-white underline">Qeydiyyat</p>
                </Link> 
               </div>
            </div>
        </div> 
    </>
  )
}

export default Login
