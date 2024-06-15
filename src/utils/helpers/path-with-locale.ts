export const pathWithLocale = (
  currentPath: string,
  destinationPath: string
): string => {
  const basePath = currentPath.split('/')[1]
  return `/${basePath}/${destinationPath}`
}
