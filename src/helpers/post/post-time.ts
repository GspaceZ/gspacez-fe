export const calculateTime = (createAt: Date | string): string => {
  const now = new Date()
  let itemCreatedAt: Date
  
  if (typeof createAt === 'string') {
    itemCreatedAt = new Date(createAt.replace('ICT', '+07:00'))
  } else {
    itemCreatedAt = createAt
  }

  const timeDiff = now.getTime() - itemCreatedAt.getTime()

  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds}s ago`
  } else if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else if (days < 7) {
    return `${days}d ago`
  } else {
    const itemYear = itemCreatedAt.getFullYear()
    const currentYear = now.getFullYear()
    if (itemYear === currentYear) {
      return itemCreatedAt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
      })
    } else {
      return itemCreatedAt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    }
  }
}
