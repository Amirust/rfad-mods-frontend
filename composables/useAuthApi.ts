import { Endpoints } from '~/types/api/endpoints';
import { useApiFetch } from '~/composables/useApiFetch';
import type { ApiResponse } from '~/types/api/core.types';
import type { Authorized } from '~/types/api/auth.types';
import { resolveError } from '~/composables/resolveError';
import { TypedError } from '~/types/api/TypedError';

export const useAuthApi = () => {
  const authorizeUser = async (code: string, redirect: string) => {
    const { error, data } = await useApiFetch<ApiResponse<Authorized>>(Endpoints.authorizeUser(), {
      method: 'POST',
      body: JSON.stringify({ code, redirect }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const validateToken = async () => {
    const { error, data } = await useApiFetch<ApiResponse<boolean>>(Endpoints.validateToken())

    if (error.value) throw TypedError.fromApiError(error.value.data.errors[0])

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const validateBoosty = async () => {
    const { error, data } = await useApiFetch<ApiResponse<boolean>>(Endpoints.validateBoosty())

    if (error.value) throw TypedError.fromApiError(error.value.data.errors[0])

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const isModerator = async () => {
    const { error, data } = await useApiFetch<ApiResponse<boolean>>(Endpoints.isModerator())

    if (error.value) throw TypedError.fromApiError(error.value.data.errors[0])

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  return {
    authorizeUser,
    validateToken,
    validateBoosty,
    isModerator
  }
}