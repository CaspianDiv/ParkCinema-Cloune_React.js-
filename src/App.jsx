import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Detail from "./pages/Detail";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import UserDashboard from "./pages/UserDashboard";
import SeatSelection from "./pages/SeatSelection";
import AdminLayout from "./layouts/AdminLayout";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <>  
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to={"/movies"} />} />

        <Route path="/movies" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Detail />} />
          <Route path="seat-selection/:seatId" element={<SeatSelection />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="payment/:paymentId" element={<Payment />} />
         <Route path="userDashboard" element={<UserDashboard />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
