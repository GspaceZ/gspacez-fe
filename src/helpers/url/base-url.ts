export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    console.log(window.location.origin)
    return window.location.origin
  } else {
    return 'https://fakebook-fe.vercel.app'
  }
}
