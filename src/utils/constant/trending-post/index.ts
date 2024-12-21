import { IPost } from '@/types/post'
import { IProfile } from '@/types/profile'
import { PostPrivacyEnum, PostTypeEnum } from '..'

export const trendingPostsData: IPost[] = [
  {
    id: '1',
    content: {
      text: 'Super Trendings',
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
    profileId: '',
    profileName: '',
    avatarUrl: '',
    trendingPoint: 0,
    hidden: false,
    hashTags: []
  },
  {
    id: '2',
    content: {
      text: 'Super Trendings',
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
    profileId: '',
    profileName: '',
    avatarUrl: '',
    trendingPoint: 0,
    hidden: false,
    hashTags: []
  },
  {
    id: '3',
    content: {
      text: 'Super Trendings',
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
    profileId: '',
    profileName: '',
    avatarUrl: '',
    trendingPoint: 0,
    hidden: false,
    hashTags: []
  }
]

export const trendingPeopleData: IProfile[] = [
  {
    id: '1',
    phone: '',
    country: '',
    city: '',
    address: 'string',
    dob: new Date('1900/01/01'),
    shortDescription: 'string',
    fullDescription: 'string',
    avtUrl:
      'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png',
    firstName: 'Dung',
    lastName: 'Tran'
  },
  {
    id: '2',
    phone: '',
    country: '',
    city: '',
    address: 'string',
    dob: new Date('1900/01/01'),
    shortDescription: 'string',
    fullDescription: 'string',
    avtUrl:
      'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png',
    firstName: 'Dung',
    lastName: 'Tran'
  },
  {
    id: '3',
    phone: '',
    country: '',
    city: '',
    address: 'string',
    dob: new Date('1900/01/01'),
    shortDescription: 'string',
    fullDescription: 'string',
    avtUrl:
      'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png',
    firstName: 'Dung',
    lastName: 'Tran'
  },
  {
    id: '4',
    phone: '',
    country: '',
    city: '',
    address: 'string',
    dob: new Date('1900/01/01'),
    shortDescription: 'string',
    fullDescription: 'string',
    avtUrl:
      'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png',
    firstName: 'Dung',
    lastName: 'Tran'
  }
]
