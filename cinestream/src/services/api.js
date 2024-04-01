import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: "df4556586815e5b2b94838a7bf5c822b",
    language: "pt-BR",
  }
})

export default api