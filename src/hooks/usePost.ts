import callApi from '@/axios'
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  GetNewsfeedResponseDto,
  GetTrendingPostsResponseDto,
  ReactPostRequestDto,
  ReactPostResponseDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto
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
      'GET',
      undefined,
      token
    )
  }

  const updatePost = async (id: string, dto: UpdatePostRequestDto, token: string) => {
    return await callApi<UpdatePostRequestDto, UpdatePostResponseDto>(
      `/post-service/posts/update/${id}`,
      'PUT',
      dto,
      token
    )
  }

  const reactPost = async (id: string, dto: ReactPostRequestDto, token: string) => {
    return await callApi<ReactPostRequestDto, ReactPostResponseDto>(
      `/post-service/posts/react/${id}`,
      'PATCH',
      dto,
      token
    )
  }

  return { createPost, getNewsfeed, getTrendingPosts, updatePost, reactPost }
}
