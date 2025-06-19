export interface ShortenerUrlBody {
  url: string
}

export interface UrlAttributes {
  id?: number
  longUrl: string
  shortCode: string
  expiresAt: Date
}
