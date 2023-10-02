import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5084/'
});
export default api;