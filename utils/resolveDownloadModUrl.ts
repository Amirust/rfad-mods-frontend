export default function resolveDownloadModUrl(modId: string): string {
  return `${useRuntimeConfig().public.apiUrl}/mods/${modId}/download`
}