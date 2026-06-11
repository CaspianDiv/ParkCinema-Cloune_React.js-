import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../context/DataContext";
import { Link, useParams } from "react-router-dom";
import { IoMdCalendar } from "react-icons/io";
import SeatHeroBg from "../assets/movie-herobg.svg"; 
import screen from "../assets/screen.svg";
import Loader from "../components/Loader";
import Error from "../pages/Error";

function SeatSelection() {

  const [selSeat , setSelSeat] = useState([]);
  const [showPop , setShowPop] = useState([]);
  const [prevSeats , setPrevSeats] = useState([]);
  const {seatId} = useParams();  

  const {movies , loader , error} = useContext(MoviesContext);
  
  if (loader) {
    return  <Loader /> 
  };
  
  if (error) {
    return <Error />
  };
  
  const seatMovie = movies.find(item => item.id === seatId);        
  console.log(seatMovie);

  const row = 13;
  const seatPerRow = 15;

  useEffect(() => {
      setPrevSeats(JSON.parse(localStorage.getItem(seatId)) || [])
  },[]);
  
  function handlePop(row , seat) {

    const isPrev = prevSeats.some(item => item.row === row && item.seat === seat);

    if (isPrev) {
        const updated = prevSeats.filter(item => !(item.row === row && item.seat === seat))
        setPrevSeats(updated);
        localStorage.setItem(seatId , JSON.stringify(updated))
        return
    };
    
    const alrSel = selSeat.some(item => item.row === row && item.seat === seat)

    if (alrSel) {
      setSelSeat(selSeat.filter(item => !(item.row === row && item.seat === seat)))
      return
    };

    if (selSeat.length >= 10) return;

    setShowPop([{row, seat}])
    const exists = showPop?.some(item => item.row === row && item.seat === seat);
    if (exists) {
      setShowPop([])
    }
  };

  console.log(prevSeats);
  

   function selectSeats(row , seat , type) {
     setSelSeat(
         [...selSeat,{row , seat , type}] 
       )
   };     

   function buyTicket() {
      const arr = [
        ...prevSeats,
        ...selSeat
      ]
      localStorage.setItem(seatId , JSON.stringify(arr))
   };
   

   // Ümumi məbləği hesablamaq üçün dəyişən 
   const total = selSeat.reduce((sum , item) => {
    const price = item.type === "Ailə" ? 
    seatMovie.family : 
    seatMovie.adult

    return sum + Number(price);
   },0)

  return (
    <>
        <div className="relative overflow-hidden">
          <h1 className="text-white text-[2rem]  pt-5 lg:pt-30 xl:pt-30 px-10">Oturacaq Seçimi</h1>
          <div className="flex justify-center py-3 px-10"> 
              <div  className="absolute flex gap-5 z-50 left-15 top-20 lg:top-50 xl:top-50">
                <div className="max-w-20 lg:min-w-50">
                  <img src={seatMovie.image} className="rounded-2xl" alt={seatMovie.name} />
                </div>
               <div className="flex-none">
                 <p className="text-[#D9DADB] lg:py-5 xl:py-5 py-1">{seatMovie.name}</p>
                  <div className="lg:flex lg:flex-col flex flex-wrap w-60 lg:w-full xl:w-full lg:gap-5 py-1 md:gap-1">
                      <p className="text-[#D9DADB] font-semibold">{seatMovie.genres[0].hallType}</p>
                      <p className="text-[#D9DADB] flex items-center gap-2">
                        <IoMdCalendar size={20} />
                        {seatMovie.firstScreeningDate}
                      </p>
                      <div className="flex items-center gap-2 text-[#D9DADB]">
                        Dil :
                        {
                          seatMovie.languages.map(obj => 
                            <img key={obj} src={Object.values(obj)[0]} alt="" />
                          )
                        }
                      </div>
                      <p className="text-[#D9DADB]">Kinoteatr : {seatMovie.genres[0].theatreTitle}</p>
                      <p className="text-[#D9DADB]">Zal : {seatMovie.genres[0].hallNumber}</p>
                      <p className="text-[#D9DADB]">Müddət : {seatMovie.genres[0].period}</p>
                  </div>
               </div>
              </div>
              <img src={SeatHeroBg} className="rounded-xl object-cover w-full" alt="" />
              <div className="absolute h-90 w-350 top-15 lg:top-45 xl:top-45 rounded-xl bg-black/70"></div>
          </div>
          <div className="px-10 flex gap-3 items-center pt-2 pb-5 justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#D9DADB] p-2.25 rounded-full"></div>
              <span className="capitalize text-[#D9DADB]">mövcuddur</span>
              <div className="bg-black p-2.25 rounded-full"></div>
              <span className="capitalize text-[#D9DADB]">tutulmuş</span>
              <div className="bg-[#D52B1E] p-2.25 rounded-full"></div>
              <span className="capitalize text-[#D9DADB]">seçilmiş</span>
            </div>
            
            <div className="px-3 flex items-center gap-3">
                {
                 <>
                  <div className="text-[#D9DADB]">Böyük <span className="font-bold">{seatMovie.adult} AZN</span></div>
                  <div className="text-[#D9DADB]">Ailə <span className="font-bold">{seatMovie.family} AZN</span></div>
                 </>
                }
            </div>
          </div>
        </div>
        <div className="pt-25 flex flex-col items-center bg-[#4D4D4D] m-5  rounded-2xl overflow-scroll lg:overflow-auto xl:overflow-auto">
           <div className="w-50 lg:w-200 xl:w-200 lg:m-auto">
             {
               Array.from({length: 13}, (rowItem , rowIndex) => {
                 const rowNum = row - rowIndex
                 return(
                  <div key={rowIndex} className="flex items-center">
                    <div className="text-white w-10 font-bold">{rowNum}</div>
                   
                    <div className="flex">
                      {
                      Array.from({length: seatPerRow} , (seatItem , seatIndex) => {
                       const seat = seatIndex + 1
                       const existsSeat = selSeat.some(item => item.row === rowNum && item.seat === seat);
                       const isOpen = showPop?.some(item => item.row === rowNum && item.seat === seat);
                       const prev = prevSeats?.some(item => item.row === rowNum && item.seat === seat);

                       return(
                         <div
                         key={seatIndex}
                         style={
                           existsSeat ? {background: "#D52B1E", color: "white"} : prev ? {background: "#000", color: "white"} : {background: "#ddd", color: "black"}
                         } 
                         onClick={() => handlePop(rowNum, seat)} className="flex relative items-center justify-center m-1 rounded-xl cursor-pointer w-10 h-10">
                            {seat}
                       {  isOpen && 
                         <div className="absolute bg-white w-20 z-50 rounded text-center left-[50%] translate-x-[-50%] top-10">
                            <div onClick={() => selectSeats(rowNum, seat, "Ailə")} className="p-3 hover:bg-[#ddd]">Ailə</div>
                            <div onClick={() => selectSeats(rowNum, seat, "Böyük")} className="p-3 hover:bg-[#ddd]">Böyük</div>
                          </div>}
                         </div>
                       )
                      })
                    }
                    </div>
                  </div>
                 )
               })
             }
           </div>
           <div className="p-[200px_0px_30px_0px]">
             <p className="capitalize text-center text-2xl text-[#D9DADB]">ekran</p>
             <img src={screen} alt="screen svg" />
           </div>
        </div> 
        <div className="flex items-center justify-between px-10 pb-5">
          <div>
              <div className="flex items-center gap-3 py-2">
                  {
                    selSeat.map((item , i) =>
                      <p key={i} className="text-[#D9DADB]">Sıra {item.row} , Yer {item.seat} ({item.type})</p>
                    )
                  }
              </div>
              <p className="capitalize text-[#D9DADB] font-semibold">ümumi: {total} AZN</p>
          </div>
          <div>
            <Link to={`/movies/payment/${seatMovie.id}`}>
              <button onClick={buyTicket} className="capitalize cursor-pointer px-20  py-2 rounded-full bg-[#D52B1E] hover:bg-[#98221a] transition-colors duration-300 text-white">bilet al</button>
            </Link>
          </div>
        </div>
    </>
  )
}

export default SeatSelection
