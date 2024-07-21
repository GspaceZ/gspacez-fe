import { IPost } from "@/types/post";
import { IProfile } from "@/types/profile";
import { PostPrivacyEnum, PostTypeEnum } from "@/utils/constant";

const fakeUser: IProfile = {
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
  firstName: 'Fakebook',
  lastName: 'User'
}

export const fakePosts: IPost[] = [
  {
    id: '1',
    user: fakeUser,
    content: {
      text: 'Welcome to Fakebook',
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
    updatedAt: new Date('2024/06/01')
  },
  {
    id: '2',
    user: fakeUser,
    content: {
      text: 'Welcome to Fakebook',
      imageUrls: ['https://cdn.pixabay.com/photo/2023/11/04/10/03/bear-8364583_640.png',
        'https://media.greatbigphotographyworld.com/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg'
      ],
      videoUrls: ['https://res.cloudinary.com/dszkt92jr/video/upload/v1721417897/Screencast_from_18-07-2024_15_42_45_zhxppj.webm'],
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
    updatedAt: new Date('2024/06/01')
  },
]
