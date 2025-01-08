import { useApiFetch } from '~/composables/useApiFetch';
import type { ApiResponse } from '~/types/api/core.types';
import { Endpoints } from '~/types/api/endpoints';
import { resolveError } from '~/composables/resolveError'
import type { CreatePreset, FindResult, Preset } from '~/types/api/presets.types';
import type { PresetTags } from '~/types/preset-tags.enum';

export const usePresetsApi = () => {
  const findOne = async (id: string) => {
    const { error, data } = await useApiFetch<ApiResponse<Preset>>(Endpoints.getPreset(id))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const findAll = async (tags: PresetTags[], page: number, limit: number = 6) => {
    const { error, data } = await useApiFetch<ApiResponse<FindResult>>(Endpoints.getPresets(tags, page, limit))

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const createPreset = async (body: CreatePreset) => {
    const { error, data } = await useApiFetch<ApiResponse<Preset>>(Endpoints.createPreset(), {
      method: 'POST',
      body: JSON.stringify(body)
    })

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error
  }

  return {
    findOne,
    findAll,
    createPreset
  }
}