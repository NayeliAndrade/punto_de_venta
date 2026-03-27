import axios from 'axios';
//api falsa para pruebas
const api = axios.create({
    baseURL: '',
});
export default api;