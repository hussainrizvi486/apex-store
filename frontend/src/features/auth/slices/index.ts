import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'






export interface AuthState {

}



const initialState: AuthState = {

}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<any>) => {
            state = action.payload
        },
        logoutUser: (state) => {
            state = initialState
        },
    },
})


export const { loginUser, logoutUser } = authSlice.actions 