import { FaUserCircle, FaTicketAlt, FaFilm, FaBullhorn, FaPhoneAlt, FaQuestionCircle, FaFileContract } from "react-icons/fa";
import { Link } from "react-router-dom";
 
function SideBar({ statusSideBar, setStatusSideBar }) {
  const menuItems = [
    { icon: <FaUserCircle size={24} />, label: "Profil" },
    { icon: <FaTicketAlt size={24} />, label: "Mənim Biletlərim"},
    { icon: <FaFilm size={24} />, label: "Kinoteatrlar"},
    { icon: <FaBullhorn size={24} />, label: "Aksiyalar"},
    { icon: <FaPhoneAlt size={24} />, label: "Əlaqə"},
    { icon: <FaQuestionCircle size={24} />, label: "FAQ"},
    { icon: <FaFileContract size={24} />, label: "Hüquqi Şərtlər"},
  ];

  return (
    <>
      <div
        onClick={() => setStatusSideBar(false)}
        className={`md:hidden fixed inset-0 bg-black z-40 transition-opacity duration-300 ${statusSideBar ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out ${statusSideBar ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setStatusSideBar(false)}
              className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <span className="text-[#D52B1E]">{item.icon}</span>
              <Link to={"sign-up"} className="text-gray-800 cursor-pointer font-medium text-sm">{item.label}</Link>
            </div>
          ))}
        </div>
        <div className="px-4 pb-6">
          <div
            className="flex items-center justify-center gap-3 p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <span className="text-2xl text-green-600">▶</span>
            <div>
              <div className="text-xs text-gray-500">GET IT ON</div>
              <div className="font-bold text-gray-800">Google Play</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;