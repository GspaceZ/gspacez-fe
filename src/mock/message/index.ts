import avatar from '@/public/landingAvatar.png'

export const mockContacts = [
  {
    id: '1',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '2',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  },
  {
    id: '3',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '4',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  },
  {
    id: '5',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '6',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  },
  {
    id: '7',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '8',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  },
  {
    id: '9',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '10',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  },
  {
    id: '11',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '12',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  },
  {
    id: '13',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '14',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  },
  {
    id: '15',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: true
  },
  {
    id: '16',
    avatar: avatar.src,
    firstName: 'Dung',
    lastName: 'Cao',
    lastMsg: 'hahahahah',
    ownLastMsg: false
  }
]

export const mockUser = {
  id: '9999',
  name: 'Bui Duc Anh',
  avatar: avatar.src
}

export const mockMessages = [
  {
    id: '1',
    content: 'Hello! How are you?',
    replyId: null,
    sentAt: new Date('2024-12-08T10:00:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '2',
    content: "I'm good, thanks! How about you?",
    replyId: '1',
    sentAt: new Date('2024-12-08T10:01:00'),
    from: {
      id: '2',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '3',
    content: "I'm doing great too!",
    replyId: '2',
    sentAt: new Date('2024-12-08T10:02:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '4',
    content: 'Did you complete the report?',
    replyId: null,
    sentAt: new Date('2024-12-08T10:03:00'),
    from: {
      id: '1',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '5',
    content: 'Yes, I sent it this morning.',
    replyId: '4',
    sentAt: new Date('2024-12-08T10:04:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '6',
    content: 'Great! I’ll review it soon.',
    replyId: '5',
    sentAt: new Date('2024-12-08T10:05:00'),
    from: {
      id: '2',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '7',
    content: 'Sure, let me know if you need any changes.',
    replyId: '6',
    sentAt: new Date('2024-12-08T10:06:00'),
    from: {
      id: '2',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '8',
    content: 'I will. By the way, are you free for lunch?',
    replyId: null,
    sentAt: new Date('2024-12-08T10:07:00'),
    from: {
      id: '1',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '9',
    content: 'Yes, let’s go at 12!',
    replyId: '8',
    sentAt: new Date('2024-12-08T10:08:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '10',
    content: 'Perfect, I’ll meet you there!',
    replyId: '9',
    sentAt: new Date('2024-12-08T10:09:00'),
    from: {
      id: '2',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '11',
    content: 'Have you checked the latest updates?',
    replyId: null,
    sentAt: new Date('2024-12-08T10:10:00'),
    from: {
      id: '2',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '12',
    content: 'Not yet, I’ll check them now.',
    replyId: '11',
    sentAt: new Date('2024-12-08T10:11:00'),
    from: {
      id: '2',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '13',
    content: 'Okay, let me know what you think.',
    replyId: '12',
    sentAt: new Date('2024-12-08T10:12:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '14',
    content: 'Sure, I’ll review them and get back to you.',
    replyId: '13',
    sentAt: new Date('2024-12-08T10:13:00'),
    from: {
      id: '1',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '15',
    content: 'Can you share the meeting notes from yesterday?',
    replyId: null,
    sentAt: new Date('2024-12-08T10:14:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '16',
    content: 'Sure! I’ll send them over right now.',
    replyId: '15',
    sentAt: new Date('2024-12-08T10:15:00'),
    from: {
      id: '2',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '17',
    content: 'Thanks! That would be really helpful.',
    replyId: '16',
    sentAt: new Date('2024-12-08T10:16:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '18',
    content: "You're welcome, happy to help!",
    replyId: '17',
    sentAt: new Date('2024-12-08T10:17:00'),
    from: {
      id: '1',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  },
  {
    id: '19',
    content: 'Do you have any updates on the project status?',
    replyId: null,
    sentAt: new Date('2024-12-08T10:18:00'),
    from: {
      id: '1',
      avatar: 'avatar1.jpg',
      name: 'Alice'
    }
  },
  {
    id: '20',
    content: "Yes, we’re making good progress. I'll keep you updated.",
    replyId: '19',
    sentAt: new Date('2024-12-08T10:19:00'),
    from: {
      id: '2',
      avatar: 'avatar2.jpg',
      name: 'Bob'
    }
  }
]
