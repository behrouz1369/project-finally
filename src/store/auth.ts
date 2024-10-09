import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store"


interface AuthState {
    tokenVerify?: string,
    messageError?:string
}

const initialState : AuthState = {
    tokenVerify : undefined,
    messageError:undefined
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        updateTokenVerify : (state , action:PayloadAction<string | undefined>) => {
            state.tokenVerify = action?.payload
        },
        updateMessageError : (state , action:PayloadAction<string | undefined>) => {
            state.messageError = action?.payload
        }
    }
})

export const {updateTokenVerify , updateMessageError} = authSlice.actions;

export const selectTokenVerify = (state : RootState) => state.auth.tokenVerify
export const selectMessageError = (state : RootState) => state.auth.messageError

export default authSlice.reducer
