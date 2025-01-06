export interface UploadedFileResult {
  hash: string
  remainingFiles: number
}

export interface FilesQuota {
  limit: number
  uploaded: number
  remaining: number
}