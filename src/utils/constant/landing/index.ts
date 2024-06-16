import { Profile } from '@/types/profile'
import { PostPrivacyEnum, PostTypeEnum } from '..'

export const landingProfile = {
  id: '12334',
  accountId: '12334',
  phone: '0987654321',
  country: 'Vietnam',
  city: 'Hanoi',
  address: 'Dinh Thon',
  dob: new Date('2003/09/29'),
  shortDesc: 'I am a rapper',
  fullDesc: 'I am a fullstack developer at GDSC HANU',
  avtUrl: '/landingAvatar.png',
  firstName: 'Fakebook',
  lastName: 'User',
  isActivated: true
} as Profile

export const landingPost = {
  id: '12334',
  authorId: '12334',
  content: 'Welcome to Fakebook!!!',
  type: PostTypeEnum.USER,
  privacy: PostPrivacyEnum.PUBLIC,
  createdAt: new Date('2024/06/15')
}
