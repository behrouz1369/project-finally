import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store"
import { User } from "@/models/user";


interface AuthState {
    tokenVerify?: string,
    messageError?:string,
    user?:User,
    page?:string,
    titleCat?:string
}

const initialState : AuthState = {
    tokenVerify : undefined,
    messageError:undefined,
    user:undefined,
    page:'1',
    titleCat:''
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        updateTokenVerify : (state , action:PayloadAction<string | undefined>) => {
            state.tokenVerify = action?.payload
        },
        updateUser : (state , action:PayloadAction<User | undefined>) => {
            state.user = action?.payload
        },
        updateMessageError : (state , action:PayloadAction<string | undefined>) => {
            state.messageError = action?.payload
        },
        updatePage : (state , action:PayloadAction<string | undefined>) => {
            state.page = action?.payload
        },
        updateTitleCat : (state , action:PayloadAction<string | undefined>) => {
            state.titleCat = action?.payload
        }
    }
})

export const {updateTokenVerify , updateMessageError , updateUser , updatePage , updateTitleCat} = authSlice.actions;

export const selectTitleCat = (state : RootState) => state.auth.titleCat
export const selectUser = (state : RootState) => state.auth.user
export const selectPage = (state : RootState) => state.auth.page
export const selectTokenVerify = (state : RootState) => state.auth.tokenVerify
export const selectMessageError = (state : RootState) => state.auth.messageError

export default authSlice.reducer
