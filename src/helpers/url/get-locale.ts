export const getLocale = (currentPath: string) => {
  return currentPath.split('/')[1]
}
