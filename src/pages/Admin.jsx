import { useContext, useState } from "react";
import { MoviesContext } from "../context/DataContext";
import { HiXMark } from "react-icons/hi2";
import Loader from "../components/Loader";
import Error from "./Error";
import { createNewMovie, deleteMovieById, editMovieById } from "../services/MoviesServices";
import toast from "react-hot-toast";

function Admin() {
  const { movies, error, loader, setMovies } = useContext(MoviesContext);
  const [popUp, setPopUp] = useState({
    method: "post",
    status: false,
  });
  const [newMovie, setNewMovie] = useState({
    name: "",
    description: "",
    image: "",
    year: "",
    languages: "[]",
  });

  function handleValues(e) {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  }

  function handlePost() {
    if (
      !newMovie.name ||
      !newMovie.description ||
      !newMovie.languages ||
      !newMovie.image ||
      !newMovie.year
    ) {
      toast.error("Please fill all input fields !!!");
      return;
    }

    if (popUp.method === "post") {
      const arrLang = JSON.parse(newMovie.languages);
      createNewMovie({
        ...newMovie,
        languages: arrLang,
      })
        .then((item) => {
          console.log(item);
          toast.success("Movie is created successfully !");
          setPopUp(false);
          setNewMovie({
            name: "",
            description: "",
            languages: "",
            image: "",
            year: "",
          });
          setMovies([...movies, item]);
        })
        .catch((err) => console.error(err));
    } else if (popUp.method === "edit") {
      editMovieById(newMovie.id , newMovie)
        .then((res) => {
          console.log(res);
          toast.success("Movie has been edited successfully !");
          setPopUp({method: "edit", status: false});
          setNewMovie({
            name: "",
            description: "",
            languages: "",
            image: "",
            year: "",
          });
            setMovies(movies.map(item =>  item.id === res.id ? res : item));
        })
        .catch((err) => console.error(err));
    }
  }

  function handleInps(id) {
    setPopUp({ status: true, method: "edit" });
    const findedMovie = movies.find((item) => item.id === id);
    setNewMovie(findedMovie);
  };

  function handleDelete(id) {
    deleteMovieById(id)
    .then(item => {
      toast.success("Movie deleted ! ")
      setMovies(movies.filter(item => item.id !== id));
    });
  };

  if (loader) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div
        className={`${popUp.status ? "flex" : "hidden"} inset-0 bg-black/50 fixed justify-center items-center`}
      >
        <div className="bg-white text-black w-150 p-5 flex flex-col gap-5 absolute">
          <div className="flex justify-between items-center">
            <h1 className="capitalize text-[2rem]">
              {popUp.method === "post" ? "add new movie" : "edit movie"}
            </h1>
            <button
              onClick={() => setPopUp({ status: false })}
              className="cursor-pointer"
            >
              <HiXMark size={35} />
            </button>
          </div>
          <input
            value={newMovie.name}
            onChange={handleValues}
            className="border p-3 rounded w-full"
            name="name"
            placeholder="name"
            type="text"
          />
          <input
            value={newMovie.description}
            onChange={handleValues}
            className="border p-3 rounded w-full"
            name="description"
            placeholder="description"
            type="text"
          />
          {
            popUp === "post" ? 
            <input
            value={JSON.stringify(newMovie.languages)}
            onChange={handleValues}
            className="border p-3 rounded w-full"
            name="languages"
            placeholder="Please fill type ['']"
            type="text"
          /> :    <input
            value={newMovie.languages}
            onChange={handleValues}
            className="border p-3 rounded w-full"
            name="languages"
            placeholder="Please fill type ['']"
            type="text"
          /> 
          }
          <input
            value={newMovie.image}
            onChange={handleValues}
            className="border p-3 rounded w-full"
            name="image"
            placeholder="image"
            type="text"
          />
          <input
            value={newMovie.year}
            onChange={handleValues}
            className="border p-3 rounded w-full"
            name="year"
            placeholder="year"
            type="text"
          />
          <button
            onClick={handlePost}
            className="p-3 rounded bg-red-700  text-[#D9DADB] cursor-pointer capitalize"
          >
            {popUp.method === "post" ? "create new movie" : "edit movie"}
          </button>
        </div>
      </div>
      <div className="container p-2 mx-auto sm:p-4  dark:text-gray-800">
        <div className="py-3">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#ccc]">
            Admin Panel
          </h2>
          <button
            onClick={() => setPopUp({ ...popUp, method: "post", status: true })}
            className="p-3 rounded bg-red-700  text-[#D9DADB] cursor-pointer"
          >
            Add New Movie
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Description</th>
                <th className="p-3">Languages</th>
                <th className="p-3 text-right">Date</th>
                <th className="p-3">Operations</th>
              </tr>
            </thead>
            <tbody>
              {movies?.map(item => (
                <tr
                  key={item.id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">
                    <p>{item.name}</p>
                  </td>
                  <td className="p-3 w-25">
                    <img src={item.image} alt="" />
                  </td>
                  <td className="p-3">
                    <p>{item.description}</p>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {item.languages &&
                        item.languages.map((img, i) => (
                          <img
                            key={i}
                            src={Object.values(img)[0]}
                            alt="flag languages svg"
                          />
                        ))}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <p>{item.year}</p>
                  </td>
                  <td className="p-3 text-right">
                    <span onClick={() => handleDelete(item.id)} className="px-3 py-1 font-semibold rounded-md dark:bg-[red] cursor-pointer dark:text-gray-50">
                      <span>Delete</span>
                    </span>
                    <span
                      onClick={() => handleInps(item.id)}
                      className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 cursor-pointer dark:text-gray-50"
                    >
                      <span>Edit</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;
