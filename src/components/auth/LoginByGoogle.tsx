import { fToast } from '@/helpers/toast'
import { Button } from '@nextui-org/react'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useLocale } from 'next-intl'

export const LoginByGoogle = () => {
  const locale = useLocale()

  const handleGoogleLogin = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
      const redirectUri = `${window.location.origin}/${locale}/auth/integration/callback`
      const scope = 'openid email profile'
      const responseType = 'code'

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=consent`

      window.location.href = googleAuthUrl
    } catch {
      fToast('Failed to initiate Google login', 'error')
    }
  }

  return (
    <Button
      startContent={<IconBrandGoogle />}
      onPress={handleGoogleLogin}
      variant="bordered"
      color="primary"
    >
      Login By Google
    </Button>
  )
}
