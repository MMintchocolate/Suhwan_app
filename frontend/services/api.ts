// frontend/services/api.ts
import axios from 'axios';

const api = axios.create({
    // 안드로이드 에뮬레이터에서 내 컴퓨터(서버)를 가리키는 주소
    baseURL: 'http://10.0.2.2:8000',
    timeout: 5000,
});

export default api;