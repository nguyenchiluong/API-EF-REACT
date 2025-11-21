import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
});


api.interceptors.response.use(res => res, 
    err => { 
        console.error("API Error:", err); 
        return Promise.reject(err); 
    }
);

api.interceptors.request.use(req => {
    console.log("Sending request:", req.method.toUpperCase(), req.url);
    return req;
});

api.interceptors.response.use(
    res => {
    console.log("Response data:", res.data);
    return res;
    },
    err => {
    console.error("API Error:", err);
    return Promise.reject(err);
    }
);


export default api;
