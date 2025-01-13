import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  callbackUrl: ''
}

export const guardSlice = createSlice({
  name: 'guard',
  initialState,
  reducers: {
    setCallbackUrl: (state, action) => {
      state.callbackUrl = action.payload.callbackUrl
    },
    clearCallbackUrl: (state) => {
      state.callbackUrl = ''
    }
  }
})

export const { setCallbackUrl, clearCallbackUrl } = guardSlice.actions
export const guardReducer = guardSlice.reducer
