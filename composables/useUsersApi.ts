import { Endpoints } from '~/types/api/endpoints';
import { useApiFetch } from '~/composables/useApiFetch';
import type { ApiResponse } from '~/types/api/core.types';
import { resolveError } from '~/composables/resolveError';
import type { PublicFullUser, PublicPartialUser } from '~/types/api/users.types';

export const useUsersApi = () => {
  const getUser = async (id: string | '@me') => {
    const { error, data } = await useApiFetch<ApiResponse<PublicPartialUser>>(Endpoints.getUser(id))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const getFullUser = async (id: string | '@me') => {
    const { error, data } = await useApiFetch<ApiResponse<PublicFullUser>>(Endpoints.getUserFull(id))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  return {
    getUser,
    getFullUser
  }
}