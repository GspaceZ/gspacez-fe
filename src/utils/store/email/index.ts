import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  resetEmail: ''
}

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload.email
    },
    clearResetEmail: (state) => {
      state.resetEmail = ''
    }
  }
})

export const { setResetEmail, clearResetEmail } = emailSlice.actions
export const emailReducer = emailSlice.reducer
