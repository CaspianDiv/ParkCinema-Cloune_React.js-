import { createContext, useEffect, useState } from "react"
import { getAllMovies, getAllTheatres } from "../services/MoviesServices";

export const MoviesContext = createContext();

function DataContext({ children }) {

  const [movies , setMovies] = useState([]);
  const [theatres , setTheatres] = useState([]);
  const [error , setError] = useState(null);
  const [loader , setLoader] = useState(true);

  useEffect(() => {
    getAllMovies()
    .then(item => setMovies(item))
    .catch(err => setError(err))
    .finally(() => setLoader(false))

    getAllTheatres()
    .then(item => setTheatres(item))
  },[]);  

  const obj = {
    movies,
    error,
    loader,
    theatres,
    setMovies
  }

  return (
    <>
      <MoviesContext.Provider value={obj}>
          {children}
      </MoviesContext.Provider>     
    </>
  )
}

export default DataContext
