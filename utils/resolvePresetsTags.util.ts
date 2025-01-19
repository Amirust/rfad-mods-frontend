import type { PresetTags } from '~/types/preset-tags.enum';
import { PresetTagList } from '~/locale/presets.tags';

interface Result<T = string> {
  race: T[]
  other: T[]
}

export default function (tags: PresetTags[]): Result {
  return {
    race: PresetTagList.filter(t => t.category === 'Раса').flatMap(t => t.values.filter(e => tags.includes(e.value)).map(v => v.label)) || [],
    other: PresetTagList.filter(t => t.category !== 'Раса').flatMap(t => t.values.filter(e => tags.includes(e.value)).map(v => v.label)) || []
  }
}

export function resolvePresetTagsRawResult(tags: PresetTags[]): Result<PresetTags> {
  return {
    race: PresetTagList.filter(t => t.category === 'Раса').flatMap(t => t.values.filter(e => tags.includes(e.value)).map(v => v.value)) || [],
    other: PresetTagList.filter(t => t.category !== 'Раса').flatMap(t => t.values.filter(e => tags.includes(e.value)).map(v => v.value)) || []
  }
}