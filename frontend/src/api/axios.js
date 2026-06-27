import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
    // Public endpoints that don't need Authorization
    const publicEndpoints = [
        "auth/login/",
    ];

    if (publicEndpoints.includes(config.url)) {
        return config;
    }

    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (
            error.response?.status === 401 &&
            error.config.url !== "auth/login/"
        ) {
            localStorage.clear();
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;