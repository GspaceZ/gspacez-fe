import { createSlice } from '@reduxjs/toolkit'

type Sidebar = {
  isOpen: boolean
}

const initialState: Sidebar = {
  isOpen: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen
    }
  }
})

export const { toggleSidebar } = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer
