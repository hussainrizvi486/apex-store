import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getAuthState } from "@features/auth"

export interface AuthState {
    user: string,
    access_token?: string;
    refresh_token?: string;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    access_token: undefined,
    refresh_token: undefined,
    isAuthenticated: false,
    ...getAuthState() || {},
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ access: string, refresh: string }>) => {
            const { access, refresh } = action.payload;
            state.access_token = access;
            state.refresh_token = refresh;
            state.isAuthenticated = true;
            localStorage.setItem('tokens', JSON.stringify({ access_token: access, refresh_token: refresh }));
        },
        logoutUser: (state) => {
            localStorage.removeItem('tokens');
            state.access_token = undefined;
            state.refresh_token = undefined;
            state.isAuthenticated = false;

        },
    },
})

export const { loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
