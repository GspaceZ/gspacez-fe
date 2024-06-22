import { getLocale } from './get-locale'

export const pathWithLocale = (currentPath: string, destinationPath: string): string => {
  const basePath = getLocale(currentPath)
  return `/${basePath}/${destinationPath}`
}
