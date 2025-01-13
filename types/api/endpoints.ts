import type { ModTags } from '~/types/mod-tags.enum';
import type { PresetTags } from '~/types/preset-tags.enum';

export class Endpoints {
  // Auth
  static authorizeUser(): string {
    return '/auth/authorize'
  }

  static validateToken(): string {
    return '/auth/verify'
  }

  static validateBoosty(): string {
    return '/auth/boosty'
  }

  static isModerator(): string {
    return '/auth/guard'
  }

  // Users
  static getUser(id: string): string {
    return `/users/${id}`
  }

  static getUserFull(id: string): string {
    return `/users/${id}/full`
  }

  // Mods
  static getMod(id: string): string {
    return `/mods/${id}`
  }

  static getMods(tags: ModTags[], page: number = 1, limit: number = 6): string {
    return `/mods?tags=${tags.join(',')}&page=${page}&limit=${limit}`
  }

  static createMod(): string {
    return '/mods'
  }

  static modifyMod(id: string): string {
    return `/mods/${id}`
  }

  static deleteMod(id: string): string {
    return `/mods/${id}`
  }

  static getModifyModData(id: string): string {
    return `/mods/${id}/modify`
  }

  // Presets
  static getPreset(id: string): string {
    return `/presets/${id}`
  }

  static getPresets(tags: PresetTags[], page: number = 1, limit: number = 6): string {
    return `/presets?tags=${tags.join(',')}&page=${page}&limit=${limit}`
  }

  static createPreset(): string {
    return '/presets'
  }

  static modifyPreset(id: string): string {
    return `/presets/${id}`
  }

  static deletePreset(id: string): string {
    return `/presets/${id}`
  }

  static getModifyPresetData(id: string): string {
    return `/presets/${id}/modify`
  }

  // Boosty
  static getBoostyMod(id: string): string {
    return `/boosty/${id}`
  }

  static getBoostyMods(tags: ModTags[], page: number = 1, limit: number = 6): string {
    return `/boosty?tags=${tags.join(',')}&page=${page}&limit=${limit}`
  }

  static downloadBoostyMod(id: string): string {
    return `/boosty/${id}/download`
  }

  static createBoostyMod(): string {
    return '/boosty'
  }

  static modifyBoostyMod(id: string): string {
    return `/boosty/${id}`
  }

  static deleteBoostyMod(id: string): string {
    return `/boosty/${id}`
  }

  static getModifyBoostyData(id: string): string {
    return `/boosty/${id}/modify`
  }

  // Files
  static uploadFile(): string {
    return '/files'
  }

  static deleteFile(hash: string): string {
    return `/files/${hash}`
  }

  static getQuota(): string {
    return '/files/quota'
  }

  // Popular
  static getPopularMods(): string {
    return '/popular'
  }
}
