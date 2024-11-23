'use server'

import { activationTemplate } from '../template/activation'
import sendEmail from '../transporter'

interface SendActivationProps {
  email: string
  firstName: string
  lastName: string
  activationLink: string
}

export const sendActivationMail = async ({
  email,
  firstName,
  lastName,
  activationLink
}: SendActivationProps) => {
  const htmlTemplate = activationTemplate({ firstName, lastName, activationLink })

  await sendEmail({ to: email, subject: 'Activate Your GspaceZ Account', html: htmlTemplate })
}
