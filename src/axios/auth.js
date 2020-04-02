import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/'
});

instance.interceptors.request.use(request => {
    request.url += '?key=AIzaSyAa-oEN5i-5hl-6fOHn-iYVY9VPp0LvGhE';
    return request;
});


export default instance;