import { combineReducers } from '@reduxjs/toolkit'
import { createPersistConfig } from './persist-config'
import { persistReducer } from 'redux-persist'
import { authReducer } from './auth'
import { emailReducer } from './email'
import { userReducer } from './user'
import { layoutReducer } from './layout'
import { guardReducer } from './guard'

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
  'shortDescription',
  'fullDescription',
  'avtUrl'
])
const layoutPersistConfig = createPersistConfig('layout', ['sidebar'])
const guardPersistConfig = createPersistConfig('guard', ['callbackUrl'])

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
const persistedEmailReducer = persistReducer(emailPersistConfig, emailReducer)
const persistedLayoutReducer = persistReducer(layoutPersistConfig, layoutReducer)
const persistedGuardReducer = persistReducer(guardPersistConfig, guardReducer)

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  email: persistedEmailReducer,
  user: persistedUserReducer,
  layout: persistedLayoutReducer,
  guard: persistedGuardReducer
})

export default rootReducer
