import callApi from '@/axios'
import { CreatePostRequestDto, CreatePostResponseDto } from '@/types/response/post'

export const usePost = () => {
  const createPost = async (dto: CreatePostRequestDto, token: string) => {
    return await callApi<CreatePostRequestDto, CreatePostResponseDto>(
      '/post-service/posts/create',
      'POST',
      dto,
      token
    )
  }

  return { createPost }
}
