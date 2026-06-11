import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { MoviesContext } from "../context/DataContext";
import Loader from "../components/Loader";

function MainLayout() {

  const {movies , loader} = useContext(MoviesContext)

  if (!movies || loader) {
    return <Loader />
  }

  return (
    <>
         <Header />
          <main className="dark:bg-[#373737] bg-red-950">
            <Outlet />
          </main>
        <Footer />  
    </>
  )
}

export default MainLayout
