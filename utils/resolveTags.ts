import type { ModTags } from '~/types/mod-tags.enum';
import type { PresetTags } from '~/types/preset-tags.enum';
import resolveModTagsUtil from '~/utils/resolveModTags.util';
import resolvePresetsTagsUtil from '~/utils/resolvePresetsTags.util';

export default function (tags: (ModTags | PresetTags)[]): string[] {
  const modTags = tags.filter(tag => tag >= 100 && tag < 300) as ModTags[];
  const presetTags = tags.filter(tag => tag >= 300) as PresetTags[];

  const resolvedPresetTags = resolvePresetsTagsUtil(presetTags);

  return [
    ...resolveModTagsUtil(modTags),
    ...[ ...resolvedPresetTags.other, ...resolvedPresetTags.race ]
  ]
}