import { Button } from '@nextui-org/react'

interface JoinButtonProps {
  status: string
}

export const JoinButton = (props: JoinButtonProps) => {
  const buttonVariant = () => {
    switch (props.status) {
      case 'joined':
        return 'bordered'
      default:
        return 'solid'
    }
  }

  const buttonColor = () => {
    switch (props.status) {
      case 'pending':
        return 'default'
      default:
        return 'primary'
    }
  }

  return (
    <Button
      variant={buttonVariant()}
      color={buttonColor()}
      size="sm"
      className="font-bold capitalize"
    >
      {props.status}
    </Button>
  )
}
