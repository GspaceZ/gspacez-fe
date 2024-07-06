import toast from 'react-hot-toast'

export const fToast = (message: string, variant: string) => {
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
    style: {
      borderRadius: '12px',
      border: '0.5px solid #ccc',
      minHeight: '30px',
      width: '1000px',
      padding: '10px 16px'
    },
    duration: 2000
  })
}
