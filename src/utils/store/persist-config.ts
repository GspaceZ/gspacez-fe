import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    }
  }
}

export const createPersistConfig = (key: string, whitelist: string[]) => {
  const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

  return {
    key,
    storage,
    whitelist
  }
}
