export default function resolveDownloadModUrl(modId: string, type: 'mods' | 'presets' = 'mods'): string {
  return `${useRuntimeConfig().public.apiUrl}/${type}/${modId}/download?upd=${Date.now()}`
}