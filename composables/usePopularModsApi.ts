import { Endpoints } from '~/types/api/endpoints';
import { useApiFetch } from '~/composables/useApiFetch';
import type { ApiResponse } from '~/types/api/core.types';
import { resolveError } from '~/composables/resolveError';

export const usePopularModsApi = () => {
  const getPopular = async () => {
    const { error, data } = await useApiFetch<ApiResponse<{
      modId: string,
      type: 'mod' | 'preset',
    }[]>>(Endpoints.getPopularMods())

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  return {
    getPopular
  }
}