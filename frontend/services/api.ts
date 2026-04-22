import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:8000',
    timeout: 5000,
})


// 외부에서 접근이 가능하도록
export default api

