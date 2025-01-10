import type { ApiResponse } from '~/types/api/core.types'
import { ErrorCode } from '~/types/api/ErrorCode.enum'
import { TypedError } from '~/types/api/TypedError';
import { useAuthStore } from '~/store/useAuthStore';

export const resolveError = (response: ApiResponse<unknown>) => {
  const authStore = useAuthStore()


  if (response.errors[0]) {
    if (response.errors[0].code === ErrorCode.TokenInvalid)
      void authStore.authenticateUser()

    throw TypedError.fromApiError(response.errors[0])
  }
}
