import { combineReducers } from '@reduxjs/toolkit'
import { sidebarReducer } from './sidebar'
import { createPersistConfig } from './persist-config'
import { persistReducer } from 'redux-persist'

const sidebarPersistConfig = createPersistConfig('sidebar', ['isOpen'])

const persistedSidebarReducer = persistReducer(
  sidebarPersistConfig,
  sidebarReducer
)

const rootReducer = combineReducers({
  sidebar: persistedSidebarReducer
})

export default rootReducer
