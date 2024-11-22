import jwt, { JwtPayload } from 'jsonwebtoken'

export const decodeActivationLinkEmail = (token: string): string | null => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || ''

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload
    return decoded.email
  } catch (error) {
    console.error('Error decoding activation link:', error)
    return null
  }
}
