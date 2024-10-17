import { createSlice } from '@reduxjs/toolkit'
import { IProfile } from '@/types/profile'

const initialState: IProfile = {
  id: '',
  firstName: '',
  lastName: '',
  phone: '',
  country: '',
  city: '',
  address: '',
  dob: new Date('1900/01/01'),
  shortDesc: '',
  fullDesc: '',
  avtUrl: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    logout: (state) => {
      state.id = ''
      state.firstName = ''
      state.lastName = ''
    }
  }
})

export const { setUser, logout } = userSlice.actions
export const userReducer = userSlice.reducer
