import React, { useContext, useState } from "react"
import { MoviesContext } from "../context/DataContext"
import Loader from "../components/Loader";
import Card from "../components/Card";
import DateComponent from "../components/DateComponent";
import dayjs from "dayjs";
import Error from "./Error";



function Home() {

  const {movies ,theatres , error , loader} = useContext(MoviesContext);
  const [lang , setLang] = useState("Dil");
  const [selectedThr , setSelectedThr] = useState("Kinoteatr");
  const [value , setValue] = React.useState(dayjs("2022-04-17"));


  const langArr = [{code: "AZ", url: "https://metropark.parkcinema.az/icons/az-flag.svg"},{code: "TR", url: "https://metropark.parkcinema.az/icons/tr-flag.svg"},{code: "EN", url: "https://metropark.parkcinema.az/icons/en-flag.svg"}, {code: "RU", url: "https://metropark.parkcinema.az/icons/ru-flag.svg"}];
  const theatreArr = [...new Set(theatres.map(item => item.theatreTitle))];  


  const filteredMovies = movies.filter(item => {
    if (lang === "Dil") return true;
    
    const key = `lang_${lang.toLowerCase()}`
    return item.languages?.some(obj => obj[key])
  });  

  const uniqueId = [...new Set(theatres.filter(item => item.theatreTitle === selectedThr).map(item => item.movie.id))];

  const uniqueMovie = uniqueId.flatMap(id => {
    return movies.filter(movie => movie.id === id)
  });

  // Seçilən tarixin formatlanması 
  const selectedDate = dayjs(value).format("YYYY-MM-DD");

  // tarix filteri 
  const filterSessions = theatres.filter(item => 
    dayjs(item.date).format("YYYY-MM-DD") === selectedDate
  );
  
  // Sessions Movie get by id 
  const movieIds = [...new Set(filterSessions.map(item => item.movie.id))];

  // filer Movie Data Sessions Theatre 
  const filterMovie = movies.filter(movie => 
    movieIds.includes(movie.id)
  );

  const isDefault = 
  lang === "Dil" && 
  selectedThr === "Kinoteatr" && 
  dayjs(value).format("YYYY-MM-DD") === dayjs("2022-04-17").format("YYYY-MM-DD");

  const finalMovie = isDefault 
  ? movies 
  : selectedThr !== "Kinoteatr" 
  ? uniqueMovie 
  : lang !== "Dil"
  ? filteredMovies
  : filterMovie

  if (loader) {
    return <Loader />
  };

  if (error) {
    return <Error />
  };

  return (
    <>
          <div className="relative container m-auto p-4"> 
              <div className="flex items-center justify-around py-10 capitalize text-2xl dark:text-[#D9DADB] text-white cursor-pointer">
                <h3>siyahı</h3>
                <h3>treylerlər</h3>
              </div>
                <div className="flex flex-col gap-10 lg:flex-row xl:flex-row  items-center justify-between">
                    <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-[30%] p-2 rounded dark:text-white dark:bg-[#373737] bg-white text-black cursor-pointer border-b outline-0" name="" id="">
                      <option disabled>Dil</option>
                      {
                        langArr.map((item , i) => 
                          <option key={i} value={item.code}>{item.code}</option>
                        )
                      }
                    </select>
                    <select value={selectedThr} onChange={(e) => setSelectedThr(e.target.value)} className="w-[30%] p-2 rounded dark:text-white dark:bg-[#373737] bg-white border-b" name="" id="">
                      <option disabled>Kinoteatr</option>
                      {
                        theatreArr.map((item , i) => 
                          <option key={i} value={item}>{item}</option>
                        )
                      }
                    </select>
                    <DateComponent  value={value} setValue={setValue} />
                    { 
                      !isDefault && 
                      <div>
                        <button 
                          onClick={  
                              () => {setLang("Dil"); setSelectedThr("Kinoteatr"); setValue(dayjs("2022-04-17"))}
                            }
                         className="capitalize text-[#EF443F] hover:bg-[#EF4444] hover:text-white transition-colors  outline hover:outline-0 p-3 rounded cursor-pointer">
                            təmizlə 
                        </button>
                    </div> 
                    }
                </div>         
          </div>
          <div className="flex flex-wrap justify-center items-center gap-15 py-7 dark:bg-[#373737] bg-red-950">
          {
            finalMovie.map((item , i) => <Card key={i} {...item} />)
          }
          </div> 
      </>
  )
}

export default Home
