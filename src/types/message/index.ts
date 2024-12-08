export interface IContact {
  id: string
  avatar: string
  firstName: string
  lastName: string
  lastMsg: string
  ownLastMsg: boolean
}

export interface IMessageBaseInfo {
  id: string
  name: string
  avatar: string
}

export interface IMessage {
  id: string
  content: string
  replyId: string | null
  sentAt: Date
  from: {
    id: string
    avatar: string
    name: string
  }
}
