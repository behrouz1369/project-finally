import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store"


interface AuthState {
    tokenVerify?: string
}

const initialState : AuthState = {
    tokenVerify : undefined
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        updateTokenVerify : (state , action:PayloadAction<string | undefined>) => {
            state.tokenVerify = action?.payload
        }
    }
})

export const {updateTokenVerify} = authSlice.actions;

export const selectTokenVerify = (state : RootState) => state.auth.tokenVerify

export default authSlice.reducer
