import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

// Define a type for the slice state
interface AuthState {
  token?: string
}

// Define the initial state using that type
const initialState: AuthState = {
  token:undefined,
}

export const authSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateToken: (state,action:PayloadAction<string|undefined>) => {
      state.token = action.payload
    }
  },
})

export const { updateToken } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.auth.token

export default authSlice.reducer
