import express from 'express'
import {
  createShortUrl,
  redirectToLongUrl,
} from '../controllers/url-controller'

export const urlRouter = express.Router()

urlRouter.post('/shorten-url', createShortUrl)
urlRouter.get('/:code', redirectToLongUrl)
