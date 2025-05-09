import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getAuthState } from "@features/auth"

export interface AuthState {
    access_token?: string;
    refresh_token?: string;
}

const initialState: AuthState = {
    access_token: undefined,
    refresh_token: undefined,
    ...getAuthState() || {},
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ access_token: string, refresh_token: string }>) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            localStorage.setItem('tokens', JSON.stringify(action.payload))
        },
        logoutUser: (state) => {
            state.access_token = undefined
            state.refresh_token = undefined
            localStorage.removeItem('tokens')
        },
    },
})

export const { loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
