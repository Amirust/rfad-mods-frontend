import type { PublicPartialUser } from '~/types/api/users.types';
import type { PresetTags } from '~/types/preset-tags.enum';

export interface FindResult {
  totalPages: number;
  mods: Preset[];
}

export interface Preset extends CreatePreset {
  id: string
  author: PublicPartialUser
  downloads: number
  lastUpdate: Date
}

export interface CreatePreset {
  name: string
  shortDescription: string
  description: string
  installGuide: string
  tags: PresetTags[]
  downloadLink: string
  additionalLinks: AdditionalLink[]
  images: {url: string, orientation: 'vertical' | 'horizontal'}[]
}


export interface AdditionalLink {
  name: string
  url: string
}