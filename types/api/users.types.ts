import type { ModTags } from '~/types/mod-tags.enum';
import type { PresetTags } from '~/types/preset-tags.enum';
import type { Mod } from '~/types/api/mods.types';
import type { Preset } from '~/types/api/presets.types';

export type ModPresetType = (Mod | Preset) & { type: 'mod' | 'preset' }

export interface PublicPartialUser {
   id: string
   username: string
   globalName: string
   avatarHash: string
}

export interface PublicFullUser extends PublicPartialUser {
   mostPopularModId: string
   modsPublished: number
   lastActivity?: Date
   mostUsedTags: (ModTags | PresetTags)[]
   mods: ModPresetType[]
}