import { combineReducers } from '@reduxjs/toolkit'
import { createPersistConfig } from './persist-config'
import { persistReducer } from 'redux-persist'
import { authReducer } from './auth'
import { emailReducer } from './email'

const authPersistConfig = createPersistConfig('auth', ['token', 'refreshToken'])
const emailPersistConfig = createPersistConfig('email', ['resetEmail', 'clearResetEmail'])

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedEmailReducer = persistReducer(emailPersistConfig, emailReducer)

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  email: persistedEmailReducer
})

export default rootReducer
