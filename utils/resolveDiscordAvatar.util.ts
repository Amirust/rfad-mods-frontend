export default function (userId: string, avatarHash: string, size: number = 256): string {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.webp?size=${size}`
}