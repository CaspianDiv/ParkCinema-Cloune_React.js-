import movieInstance from "../api/axiosInstance";

async function request(endpoint){
    try {
        const res = await movieInstance.get(`/${endpoint}`)
        return  res.data
    } catch (error) {
        console.error(error.message || "An error occurred during the fetch operation!");
    }
};

async function createNewMovie(newMovie) {
    try {
        const res = await movieInstance.post(`/movies`, newMovie)
        return  res.data
    } catch (error) {
        console.error(error.message || "An error occurred during the fetch operation!");
    }
};
async function editMovieById(id , movie) {
    try {
        const res = await movieInstance.patch(`/movies/${id}`, movie)
        return  res.data
    } catch (error) {
        console.error(error.message || "An error occurred during the fetch operation!");
    }
};

async function deleteMovieById(id) {
    try {
        const res = await movieInstance.delete(`/movies/${id}`)
        return  res.data
    } catch (error) {
        console.error(error.message || "An error occurred during the fetch operation!");
    }
};


const getAllMovies = () => request("movies");
const getMoviesSlider = () => request("slider");
const getMovieById = (id) => request(`movies/${id}`);
const getAllTheatres = () => request("theatre");


export {
    getAllMovies,
    getMovieById,
    getMoviesSlider,
    getAllTheatres,
    createNewMovie,
    editMovieById,
    deleteMovieById
}