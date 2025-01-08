import type { PresetTags } from '~/types/preset-tags.enum';
import { PresetTagList } from '~/locale/presets.tags';

interface Result {
  race: string[]
  other: string[]
}

export default function (tags: PresetTags[]): Result {
  return {
    race: PresetTagList.find(t => t.category === 'Раса')?.values.filter(e => tags.includes(e.value)).map(v => v.label) || [],
    other: PresetTagList.find(t => t.category !== 'Раса')?.values.filter(e => tags.includes(e.value)).map(v => v.label) || []
  }
}