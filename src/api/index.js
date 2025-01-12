import axios from "axios";

// 1. create a base url using axios and use different paths for different resources.
const API = axios.create({
    baseURL: "http://localhost:5001/api"
})

export default API