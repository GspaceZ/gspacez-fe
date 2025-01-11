import callApi from '@/axios'
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostResponseDto,
  GetNewsfeedRequestDto,
  GetNewsfeedResponseDto,
  GetTrendingTopicsResponse,
  ReactPostRequestDto,
  ReactPostResponseDto,
  TogglePostResponseDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto
} from '@/types/dto/post'

export const usePost = () => {
  const createPost = async (dto: CreatePostRequestDto, token: string) => {
    return await callApi<CreatePostRequestDto, CreatePostResponseDto>(
      '/post-service/posts/create',
      'POST',
      dto,
      token
    )
  }

  const getNewsfeed = async (dto: GetNewsfeedRequestDto, token: string) => {
    console.log(dto)
    return await callApi<GetNewsfeedRequestDto, GetNewsfeedResponseDto>(
      '/post-service/posts/newsfeed',
      'GET',
      dto,
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

  const deletePost = async (id: string, token: string) => {
    return await callApi<never, DeletePostResponseDto>(
      `/post-service/posts/delete/${id}`,
      'DELETE',
      undefined,
      token
    )
  }

  const togglePost = async (id: string, dto: null, token: string) => {
    return await callApi<null, TogglePostResponseDto>(
      `/post-service/posts/toggle/${id}`,
      'POST',
      dto,
      token
    )
  }

  const getTrendingTopics = async (token: string) => {
    return await callApi<never, GetTrendingTopicsResponse>(
      `/post-service/posts/trending-topics`,
      'GET',
      undefined,
      token
    )
  }

  return {
    createPost,
    getNewsfeed,
    updatePost,
    reactPost,
    deletePost,
    togglePost,
    getTrendingTopics
  }
}
