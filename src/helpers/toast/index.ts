import toast from 'react-hot-toast'

export const fToast = (message: string, variant: string) => {
  const commonStyles = {
    borderRadius: '12px',
    border: '0.5px solid #ccc',
    minHeight: '30px',
    minLength: '150px',
    padding: '4px 8px'
  }

  const customVariants = ['success', 'danger', 'info', 'warning']
  const index = customVariants.findIndex((customVariant: string) => {
    return customVariant === variant
  })

  const icon = {
    name: ''
  }

  switch (index) {
    case 0:
      icon.name = '✅️'
      break

    case 1:
      icon.name = '❌'
      break

    case 2:
      icon.name = 'ℹ️'
      break

    case 3:
      icon.name = '⚠️'
      break
  }

  toast(message, {
    icon: icon.name,
    style: commonStyles,
    duration: 1500
  })
}
