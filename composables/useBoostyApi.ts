import { useApiFetch } from '~/composables/useApiFetch';
import type { ApiResponse } from '~/types/api/core.types';
import { Endpoints } from '~/types/api/endpoints';
import { resolveError } from '~/composables/resolveError'
import type { BoostyMod, CreateBoostyMod, FindResult } from '~/types/api/boosty.types';
import type { ModTags } from '~/types/mod-tags.enum';

export const useBoostyApi = () => {
  const findOne = async (id: string) => {
    const { error, data } = await useApiFetch<ApiResponse<BoostyMod>>(Endpoints.getBoostyMod(id))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const findAll = async (tags: ModTags[], page: number, limit: number = 6) => {
    const { error, data } = await useApiFetch<ApiResponse<FindResult>>(Endpoints.getBoostyMods(tags, page, limit))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const createBoostyMod = async (body: CreateBoostyMod) => {
    const { error, data } = await useApiFetch<ApiResponse<BoostyMod>>(Endpoints.createBoostyMod(), {
      method: 'POST',
      body: JSON.stringify(body)
    })

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error
  }


  const getModifyData = async (id: string) => {
    const { error, data } = await useApiFetch<ApiResponse<BoostyMod>>(Endpoints.getModifyBoostyData(id))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const modify = async (id: string, body: Partial<CreateBoostyMod>) => {
    const { error, data } = await useApiFetch<ApiResponse<BoostyMod>>(Endpoints.modifyBoostyMod(id), {
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
    createBoostyMod,
    getModifyData,
    modify
  }
}