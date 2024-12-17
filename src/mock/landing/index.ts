import { IProfile } from '@/types/profile'
import { PostPrivacyEnum, PostTypeEnum } from '../../utils/constant'
import LandingAvatar from '@/public/landingAvatar.png'

export const landingProfile = {
  id: '12334',
  accountId: '12334',
  phone: '0987654321',
  country: 'Vietnam',
  city: 'Hanoi',
  address: 'Dinh Thon',
  dob: new Date('2003/09/29'),
  shortDescription: 'I am a rapper',
  fullDescription: 'I am a fullstack developer at GDSC HANU',
  avtUrl: LandingAvatar.src,
  firstName: 'GspaceZ',
  lastName: 'User',
  isActivated: true
} as IProfile

export const landingPost = {
  id: '3',
  user: {
    id: '1',
    phone: '',
    country: '',
    city: '',
    address: 'string',
    dob: new Date('1900/01/01'),
    shortDescription: 'string',
    fullDescription: 'string',
    firstName: 'GspaceZ',
    lastName: 'User'
  },
  content: {
    text: 'Welcome to GspaceZ',
    imageUrls: [],
    videoUrls: [],
    location: '',
    feeling: '',
    tag: []
  },
  comments: [],
  reacts: [],
  shares: [],
  privacy: PostPrivacyEnum.PUBLIC,
  location: '',
  type: PostTypeEnum.USER,
  createdAt: new Date('2024/06/01'),
  updatedAt: new Date('2024/06/01'),
  profileId: '123',
  profileName: 'Dung Tran',
  trendingPoint: 0,
  avatarUrl: LandingAvatar.src,
  hidden: false
}
