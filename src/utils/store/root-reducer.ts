import { combineReducers } from '@reduxjs/toolkit'
import { createPersistConfig } from './persist-config'
import { persistReducer } from 'redux-persist'
import { authReducer } from './auth'

const authPersistConfig = createPersistConfig('auth', ['token', 'refreshToken'])

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

const rootReducer = combineReducers({
  auth: persistedAuthReducer
})

export default rootReducer
