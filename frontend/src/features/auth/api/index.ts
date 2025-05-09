import axios from 'axios';
import { Dispatch } from 'redux';
import { logoutUser, loginUser as loginUserAction } from '../slices';

import { API_URL } from "@api";
import { getAuthState } from "@features/auth";


interface LoginBody {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    refresh_token: string;
    // user: {
    //     id: string;
    //     email: string;
    //     first_name: string;
    //     last_name: string;
    //     role: string;
    // };
}

const authAPI = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
});

// Request interceptor
authAPI.interceptors.request.use((config) => {
    const tokens = getAuthState();
    console.log("tokens", tokens);
    if (tokens?.access) {
        config.headers["Authorization"] = `Bearer ${tokens.access}`;
    }
    return config;
});

// Response interceptor
authAPI.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const dispatch = error.config?.__dispatch;
                const data = await refreshAccessTokenFn(dispatch);

                if (!data) {
                    return Promise.reject(error);
                }

                authAPI.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
                return authAPI(originalRequest);
            } catch (err) {
                // localStorage.removeItem('tokens');
                window.location.href = '/';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);


const loginUser = async (body: LoginBody): Promise<LoginResponse> => {
    const response = await axios.post(API_URL + '/auth/api/v1/login', body);
    return response.data;
};

const registerUser = async (body: { email: string; password: string }) => {
    return await authAPI.post('/auth/api/v1/register', body);
};

async function refreshAccessTokenFn(dispatch?: Dispatch): Promise<LoginResponse | null> {
    const tokens = getAuthState();
    // console.log("tokens ref", tokens)

    if (!tokens?.refresh_token) {
        // localStorage.removeItem("tokens");
        dispatch?.(logoutUser());
        return null;
    }

    try {
        const response = await authAPI.post<LoginResponse>('/auth/api/v1/refresh', {
            refresh_token: tokens.refresh_token
        });
        const { data } = response;
        localStorage.setItem("tokens", JSON.stringify(data));
        dispatch?.(loginUserAction(data));
        return data;
    } catch (error) {
        // localStorage.removeItem("tokens");
        dispatch?.(logoutUser());
        return null;
    }
}

export { loginUser, registerUser, refreshAccessTokenFn, authAPI };
