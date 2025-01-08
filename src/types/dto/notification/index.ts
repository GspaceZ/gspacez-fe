export type GetNotificationsResponseDto = {
  code: number
  message: string
  result: NotificationItem[]
}

export type NotificationItem = {
  id: string
  profileId: string
  entity: NotificationCommentEntity
  content: string
  type: string
  createdAt: Date
  isRead: boolean
}

export type NotificationCommentEntity = {
  id: string
  postId: string
  commentId: string
  commentRequest: {
    content: {
      text: string
      imageUrls: string[]
      videoUrls: string[]
    }
    parentId: string | null
  }
  receiver: {
    id: string
    profileId: string
    profileName: string
    email: string | null
    profileImageUrl: string | null
  }
  sender: {
    id: string
    profileId: string
    profileName: string
    email: string | null
    profileImageUrl: string | null
  }
  createdAt: string
}
