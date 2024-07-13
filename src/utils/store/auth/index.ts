import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  refreshToken: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    },
    logout: (state) => {
      state.token = ''
      state.refreshToken = ''
    }
  }
})

export const { setAuth, logout } = authSlice.actions
export const authReducer = authSlice.reducer
