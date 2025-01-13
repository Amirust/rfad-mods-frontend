import type { PresetTags } from '~/types/preset-tags.enum';
import { PresetTagList } from '~/locale/presets.tags';

interface Result<T = string> {
  race: T[]
  other: T[]
}

export default function (tags: PresetTags[]): Result {
  return {
    race: PresetTagList.find(t => t.category === 'Раса')?.values.filter(e => tags.includes(e.value)).map(v => v.label) || [],
    other: PresetTagList.find(t => t.category !== 'Раса')?.values.filter(e => tags.includes(e.value)).map(v => v.label) || []
  }
}

export function resolvePresetTagsRawResult(tags: PresetTags[]): Result<PresetTags> {
  return {
    race: PresetTagList.find(t => t.category === 'Раса')?.values.filter(e => tags.includes(e.value)).map(v => v.value) || [],
    other: PresetTagList.find(t => t.category !== 'Раса')?.values.filter(e => tags.includes(e.value)).map(v => v.value) || []
  }
}