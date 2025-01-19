import { useApiFetch } from '~/composables/useApiFetch';
import type { ApiResponse } from '~/types/api/core.types';
import { Endpoints } from '~/types/api/endpoints';
import { resolveError } from '~/composables/resolveError';
import type { FilesQuota, UploadedFileResult } from '~/types/api/files.types';

export const useFilesApi = () => {
  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append('file', file);

    const { error, data } = await useApiFetch<ApiResponse<UploadedFileResult>>(Endpoints.uploadFile(), {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: form
    })

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const deleteFile = async (hash: string, isUrl: boolean = false) => {
    const { error, data } = await useApiFetch<ApiResponse<{ ok: boolean }>>(isUrl ? hash : Endpoints.deleteFile(hash), {
      method: 'DELETE'
    })

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  const getQuota = async () => {
    const { error, data } = await useApiFetch<ApiResponse<FilesQuota>>(Endpoints.getQuota())

    if (error.value) resolveError(error.value.data)

    if (data.value) return data.value.result
    else throw new Error('No data')
  }

  return {
    uploadFile,
    deleteFile,
    getQuota
  }
}