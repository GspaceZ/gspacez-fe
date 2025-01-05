import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebar: {
    isOpen: false
  }
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen
    }
  }
})

export const { toggleSidebar } = layoutSlice.actions
export const layoutReducer = layoutSlice.reducer
