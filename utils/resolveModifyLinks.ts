export default function resolveModifyLinks(id: string, type: 'presets' | 'mods' | 'boosty') {
  return [
    `/${type}/${id}/modify`,
    `/${type}/${id}/step2`,
    `/${type}/${id}/step3`
  ]
}