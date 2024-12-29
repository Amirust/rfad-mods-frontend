import type {ErrorCode} from '~/types/api/ErrorCode.enum';


export interface OkStatus {
  ok: boolean
}

export interface Count {
  count: number
}

export interface ApiResponse<T> {
  ok: boolean
  result: T
  errors: ResponseError[]
}

export interface ResponseError {
  code: ErrorCode
  message: string
  details: any[]
}
