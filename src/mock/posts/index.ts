import { IPost } from '@/types/post'
import { PostPrivacyEnum, PostTypeEnum } from '@/utils/constant'

export const fakePosts: IPost[] = [
  {
    id: '1',
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
    profileId: '',
    profileName: '',
    avatarUrl: '',
    trendingPoint: 0,
    hidden: false
  },
  {
    id: '2',
    content: {
      text: 'Welcome to GspaceZ',
      imageUrls: [
        'https://cdn.pixabay.com/photo/2023/11/04/10/03/bear-8364583_640.png',
        'https://media.greatbigphotographyworld.com/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg'
      ],
      videoUrls: [
        'https://res.cloudinary.com/dszkt92jr/video/upload/v1721417897/Screencast_from_18-07-2024_15_42_45_zhxppj.webm'
      ],
      location: 'Hanoi',
      feeling: 'Happy',
      tag: ['travel', 'trip']
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
    hidden: false
  },
  {
    id: '4',
    content: {
      text: 'Welcome to GspaceZ',
      imageUrls: [
        'https://res.cloudinary.com/dszkt92jr/image/upload/v1721463934/fgcnetakyb8nibeqr9do.png'
      ],
      videoUrls: [
        'https://res.cloudinary.com/dszkt92jr/video/upload/v1721417897/Screencast_from_18-07-2024_15_42_45_zhxppj.webm'
      ],
      location: 'Hanoi',
      feeling: 'Happy',
      tag: ['travel', 'trip']
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
    hidden: false
  }
]
