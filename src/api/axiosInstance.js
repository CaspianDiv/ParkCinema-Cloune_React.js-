const BASE_URL = import.meta.env.VITE_BASE_URL
import axios from "axios";

const movieInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

export default movieInstance