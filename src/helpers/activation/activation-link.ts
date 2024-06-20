import { ROUTE } from '@/utils/constant/route'
import jwt from 'jsonwebtoken'

interface ActivationLinkProps {
  email: string
  locale: string
  baseUrl: string
}

export const generateActivationLink = ({ email, locale, baseUrl }: ActivationLinkProps): string => {
  const payload = { email }
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set!')
  }

  try {
    const token = jwt.sign(payload, secret, {})
    return `${baseUrl}/${locale}/${ROUTE.auth.activate_account}?token=${token}`
  } catch (error) {
    console.error('Error generating activation link:', error)
    throw error
  }
}
