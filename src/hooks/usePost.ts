import callApi from '@/axios'
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  GetNewsfeedResponseDto,
  GetTrendingPostsResponseDto
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

  const getTrendingPosts = async (token: string) => {
    return await callApi<never, GetTrendingPostsResponseDto>(
      '/post-service/posts/trending-posts',
      'GEt',
      undefined,
      token
    )
  }

  return { createPost, getNewsfeed, getTrendingPosts }
}
