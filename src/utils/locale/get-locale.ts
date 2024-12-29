import { NextApiRequest } from 'next'

export const getLocaleFromRequest = (req: NextApiRequest) => {
  const locale = req.headers['accept-language'] as string
  return locale
}
