export class Endpoints {
  // Auth
  static authorizeUser(): string {
    return '/auth/authorize'
  }

  static validateToken(): string {
    return '/auth/verify'
  }

  static getUser(id: string): string {
    return `/users/${id}`
  }
}
