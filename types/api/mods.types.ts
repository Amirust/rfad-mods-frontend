import type {PublicPartialUser} from '~/types/api/users.types';
import type {ModTags} from '~/types/mod-tags.enum';
import type {VersionsEnum} from '~/types/api/core.types';

export interface FindResult {
  totalPages: number;
  mods: Mod[];
}

export interface Mod extends CreateMod {
  id: string
  author: PublicPartialUser
  downloads: number
  lastUpdate: Date
}

export interface CreateMod {
  authorId: string
  name: string
  shortDescription: string
  description: string
  versions: VersionsEnum[]
  tags: ModTags[]
  downloadLink: string
  additionalLinks: AdditionalLinkDTO[]
  images: string[]
}


export interface AdditionalLinkDTO {
  name: string
  url: string
}