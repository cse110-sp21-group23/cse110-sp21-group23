import axios from "axios";

// http://localhost:8080 FOR local server

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export default api;