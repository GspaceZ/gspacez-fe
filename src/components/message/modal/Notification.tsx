'use client'

import { Radio, RadioGroup } from '@nextui-org/react'

export const NotificationModal = () => {
  const notificationChoices = [
    {
      label: 'Never',
      value: '0'
    },
    {
      label: '1 hour',
      value: '1'
    },
    {
      label: '8 hours',
      value: '8'
    },
    {
      label: '24 hours',
      value: '24'
    },
    {
      label: 'To the end of the day',
      value: 'end'
    },
    {
      label: 'Until I turn on',
      value: 'manual'
    }
  ]

  return (
    <RadioGroup>
      {notificationChoices.map((choice) => (
        <Radio value={choice.value} key={choice.value}>
          {choice.label}
        </Radio>
      ))}
    </RadioGroup>
  )
}
