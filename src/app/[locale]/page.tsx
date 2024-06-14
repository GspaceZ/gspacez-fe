import { Button } from '@nextui-org/button'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()

  return (
    <div className="pt-2">
      <Button color="primary" variant="light">
        {t('message')}
      </Button>
    </div>
  )
}
