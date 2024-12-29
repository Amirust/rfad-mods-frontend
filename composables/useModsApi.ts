import type {ModTags} from '~/types/mod-tags.enum';
import {useApiFetch} from '~/composables/useApiFetch';
import type {ApiResponse} from '~/types/api/core.types';
import {Endpoints} from '~/types/api/endpoints';
import {resolveError} from '~/composables/resolveError';
import type {FindResult} from '~/types/api/mods.types';

export const useModsApi = () => {
  const findOne = async (id: string) => {
    // Implementation
  }

  const findAll = async (tags: ModTags[], page: number, limit: number = 6) => {
    const { error, data } = await useApiFetch<ApiResponse<FindResult>>(Endpoints.getMods(tags, page, limit))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  return {
    findOne,
    findAll
  }
}