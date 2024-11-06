import { combineReducers } from '@reduxjs/toolkit'
import { createPersistConfig } from './persist-config'
import { persistReducer } from 'redux-persist'
import { authReducer } from './auth'
import { emailReducer } from './email'
import { userReducer } from './user'

const authPersistConfig = createPersistConfig('auth', ['token', 'refreshToken'])
const emailPersistConfig = createPersistConfig('email', ['resetEmail', 'clearResetEmail'])
const userPersistConfig = createPersistConfig('user', [
  'id',
  'firstName',
  'lastName',
  'phone',
  'country',
  'city',
  'address',
  'dob',
  'shortDesc',
  'fullDesc',
  'avtUrl'
])

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
const persistedEmailReducer = persistReducer(emailPersistConfig, emailReducer)

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  email: persistedEmailReducer,
  user: persistedUserReducer
})

export default rootReducer
