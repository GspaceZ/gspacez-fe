import callApi from '@/axios'
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  GetNewsfeedResponseDto
} from '@/types/response/post'

export const usePost = () => {
  const createPost = async (dto: CreatePostRequestDto, token: string) => {
    return await callApi<CreatePostRequestDto, CreatePostResponseDto>(
      '/post-service/posts/create',
      'POST',
      dto,
      token
    )
  }

  const getNewsfeed = async (token: string) => {
    return await callApi<never, GetNewsfeedResponseDto>(
      '/post-service/posts/newsfeed',
      'GET',
      undefined,
      token
    )
  }

  return { createPost, getNewsfeed }
}
