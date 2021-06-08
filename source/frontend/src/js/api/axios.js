import axios from "axios";

// http://localhost:8080 FOR local server

const api = axios.create({
    baseURL: 'https://cse110-23-api.herokuapp.com',
});

export default api;