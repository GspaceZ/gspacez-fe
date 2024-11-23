export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  } else {
    return 'https://GspaceZ-fe.vercel.app'
  }
}
