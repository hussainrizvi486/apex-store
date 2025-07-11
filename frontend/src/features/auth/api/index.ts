import axios from 'axios';
import { Dispatch } from 'redux';
import { logoutUser, loginUser as loginUserAction } from '../slices';

import { API_URL } from "@api";
import { getAuthState } from "@features/auth";
import { use } from 'react';
import { useMatch } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';




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
});


// Request interceptor
authAPI.interceptors.request.use((config) => {
    const tokens = getAuthState();
    if (tokens?.access_token) {
        config.headers["Authorization"] = `Bearer ${tokens.access_token}`;
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

    if (!tokens?.refresh_token) {
        localStorage.removeItem("tokens");
        dispatch?.(logoutUser());
        return null;
    }

    try {
        const response = await authAPI.post<LoginResponse>('/auth/api/v1/login/refresh', {
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

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: loginUser,
        mutationKey: ["login - user"],

        // onSuccess: (data, variables, context) => {
        //     localStorage.setItem("tokens", JSON.stringify(data));
        //     // Dispatch login action if needed
        //     // dispatch(loginUserAction(data));
        // },
        // onError: (error, variables, context) => {
        //     console.error("Login failed:", error);
        // }
    })
}

export { loginUser, registerUser, refreshAccessTokenFn, authAPI };


