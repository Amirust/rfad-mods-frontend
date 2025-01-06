export default function resolveCDNImage(authorId: string, hash: string, withExtension: boolean = true): string {
  return useRuntimeConfig().public.cdnUrl + `${authorId}_${hash}${withExtension ? '.webp' : ''}`;
}