import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ws.audioscrobbler.com/2.0'
});

instance.interceptors.request.use(request => {
    request.url += "&api_key=57ee3318536b23ee81d6b27e36997cde&format=json";
    return request;
});

export default instance;
