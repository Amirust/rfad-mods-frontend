import { useFetch } from '#app'
import { useAuthStore } from '~/store/useAuthStore';

type useFetchType = typeof useFetch

export const useApiFetch: useFetchType = (path, options = {}) => {
  const auth = useAuthStore()

  if (auth.getToken)
    options.headers = {
      Authorization: `Bearer ${auth.token}`
    }

  options.baseURL = useRuntimeConfig().public.apiUrl as string
  return useFetch(path, options)
}
