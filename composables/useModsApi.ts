import type { ModTags } from '~/types/mod-tags.enum';
import { useApiFetch } from '~/composables/useApiFetch';
import type { ApiResponse } from '~/types/api/core.types';
import { Endpoints } from '~/types/api/endpoints';
import { resolveError } from '~/composables/resolveError';
import type { CreateMod, FindResult, Mod } from '~/types/api/mods.types';

export const useModsApi = () => {
  const findOne = async (id: string) => {
    const { error, data } = await useApiFetch<ApiResponse<Mod>>(Endpoints.getMod(id))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const findAll = async (tags: ModTags[], page: number, limit: number = 6) => {
    const { error, data } = await useApiFetch<ApiResponse<FindResult>>(Endpoints.getMods(tags, page, limit))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const createMod = async (body: CreateMod) => {
    const { error, data } = await useApiFetch<ApiResponse<Mod>>(Endpoints.createMod(), {
      method: 'POST',
      body: JSON.stringify(body)
    })

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error
  }

  const getModifyData = async (id: string) => {
    const { error, data } = await useApiFetch<ApiResponse<Mod>>(Endpoints.getModifyModData(id))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const modify = async (id: string, body: Partial<CreateMod>) => {
    const { error, data } = await useApiFetch<ApiResponse<Mod>>(Endpoints.modifyMod(id), {
      method: 'PATCH',
      body: JSON.stringify(body)
    })

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error
  }

  return {
    findOne,
    findAll,
    createMod,
    getModifyData,
    modify
  }
}