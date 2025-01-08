import type { ModTags } from '~/types/mod-tags.enum';
import { ModTagList } from '~/locale/mod.tags';

export default function (tags: ModTags[]): string[] {
  return tags.map(tag => ModTagList.find(t => t.values.find(v => v.value === tag))?.values.find(v => v.value === tag)?.label || '')
}