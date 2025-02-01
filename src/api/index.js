import axios from "axios";

// 1. create a base url using axios and use different paths for different resources.
const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_SERVICE_URL
})

export default API