import axios from 'axios';
//api falsa para pruebas
const api = axios.create({
    baseURL: '/api',
    /* timeout: 5000,
    headers: {
        "content-type": "application/json"
    }, */
});
export default api;