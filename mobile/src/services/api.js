import axios from 'axios';

const api = axios.create({
    baseURL:"http://19.19.19.106:3000"
})

export default api;