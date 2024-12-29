import { ErrorCode } from './ErrorCode.enum'
import type { ResponseError } from '~/types/api/core.types'

export class TypedError extends Error {
  public errorCode: ErrorCode

  constructor(message: string, errorCode: ErrorCode) {
    super(message)
    this.name = 'TypedError'
    this.errorCode = errorCode
  }

  public static fromApiError(error: ResponseError) {
    return new TypedError(error.message, error.code)
  }
}
