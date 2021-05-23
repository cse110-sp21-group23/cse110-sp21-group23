import axios from "axios";
const api = axios.create({
    baseURL: 'https://cse110-23-api.herokuapp.com',
});

export default api;