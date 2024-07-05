export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  } else {
    return 'https://fakebook-fe.vercel.app'
  }
}
