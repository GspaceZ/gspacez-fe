import { ROUTE } from '@/utils/constant/route'

interface ActivationLinkProps {
  email: string
  locale: string
  baseUrl: string
}

export const generateActivationLink = ({ locale, baseUrl }: ActivationLinkProps): string => {
  return `${baseUrl}/${locale}/${ROUTE.auth.activate_account}`
}
