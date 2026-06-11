import {  useContext, useEffect, useState } from "react";
import {  Link, useParams } from "react-router-dom"
import { getMovieById } from "../services/MoviesServices";
import Loader from "../components/Loader";
import Error from "../pages/Error";
import { MoviesContext } from "../context/DataContext";

function Detail() {

  const {id} = useParams();  
  
  const {error , theatres} = useContext(MoviesContext);  
      
  const [detMovie , setDetMovie] = useState(null);

  const sessions = theatres.filter(item => item?.movie?.id === id);  
  
  useEffect(() =>{
    getMovieById(id)
    .then(item => setDetMovie(item))
  },[id]);

  if (!detMovie) {
    return <Loader />
  };

  if (error) {
    return <Error />
  };

  const subtitles = Array.isArray(detMovie.subtitles) ? detMovie.subtitles : []

  return (
    <>
         <div className="dark:bg-[#373737] text-[#c3281d]">
            <div className="rounded-2xl flex gap-10 w-full flex-wrap p-[150px_0px_10px_40px]"> 
                <div className="max-w-80">
                  <img  src={detMovie?.image} className="rounded-4xl bg-cover object-cover" alt="" />
                </div>
                <div className="text-[#D9DADB] flex flex-col gap-4 max-w-90">
                  <h4>{detMovie?.name}</h4>
                  <p>{detMovie?.genres[0].title}</p>
                    <p>Dil</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        {
                          detMovie.languages.map((langObj , index) => 
                              <img key={index} className="w-6 h-6 object-contain"  src={Object.values(langObj)[0]} alt="" />
                            )
                        }
                      </div>
                      <p>Altyazı</p>
                       <div className="flex items-center gap-2">
                         {
                             subtitles.map((subObj , index) =>  
                                 <img key={`${index}`} className="w-6 h-6 object-contain" src={Object.values(subObj)[0]} alt="" />
                             )
                         }
                       </div>
                      <p>Müddət : {detMovie?.duration}</p>
                      <p>İl : {detMovie?.year}</p>
                      <p>Rejissor  :{detMovie?.director}</p>
                      <p>Akyorlar : {detMovie?.actors}</p>
                      <p>Yaş həddi : {detMovie?.ageLimit}</p>
                      <p>Nümayiş tarixi : {detMovie?.firstScreeningDate}</p>
                </div>
                      {
                        detMovie.trailerUrl ? <div className="p-10">
                            <iframe className="w-full" width={600} height={400} src={detMovie.trailerUrl}></iframe>
                        </div> : ''
                      }
            </div>
            <div className="p-10 text-[#D9DADB] py-5">{detMovie?.description}</div>
            <div className="p-10">
              {
                sessions.map((item , i) => 
                 <div key={i}>
                   <div key={i} className="py-5 border-b border-[#D9DADB] container m-auto grid grid-cols-5 grid-rows-1">
                       <div className="px-20">
                         <p className="text-[#D9DADB]">{item.time}</p>
                       </div>
                       <div>
                         <p className="text-[#D9DADB]">{item.theatreTitle} | {item.hallTitle}</p>
                       </div>
                       <div className="flex gap-2 items-center">
                         <p className="text-[#D9DADB]">{item.type}</p>
                         <p className="text-[#D9DADB]">{item.language}</p>
                       </div>
                       <div>
                         <p className="text-[#D9DADB]">{item.subtitle === "NONE" ? "Altyazı yoxdur" : item.subtitle}</p>
                       </div>
                      <Link to={`/movies/seat-selection/${id}`}>
                          <button className="capitalize text-[#D9DADB] bg-[#9E3027] transition-colors hover:bg-[#a11205] p-2 w-50 cursor-pointer rounded-full">bilet al</button>
                      </Link>
                    </div>
                 </div>
                )
              }
            </div>
         </div>
    </>
  )
}

export default Detail
