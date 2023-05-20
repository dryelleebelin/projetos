//base da url: https://api.themoviedb.org/3/
//url da api: movie/now_playing?api_key=df4556586815e5b2b94838a7bf5c822b

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;