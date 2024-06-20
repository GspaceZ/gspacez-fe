export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(window.location.origin)
    return window.location.origin
  } else {
    return 'https://fakebook-fe.vercel.app'
  }
}
