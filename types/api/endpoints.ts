import type { ModTags } from '~/types/mod-tags.enum';

export class Endpoints {
  // Auth
  static authorizeUser(): string {
    return '/auth/authorize'
  }

  static validateToken(): string {
    return '/auth/verify'
  }

  // Users
  static getUser(id: string): string {
    return `/users/${id}`
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
}
