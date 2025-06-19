import type { Request, Response } from 'express'
import type { ShortenerUrlBody } from '../interfaces'
import { nanoid } from 'nanoid'
import { Url } from '../models/url'
import { Op } from 'sequelize'

const PORT = process.env.SERVER_PORT || 3001

export const createShortUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { url } = req.body as ShortenerUrlBody

  if (!url) {
    res.status(400).json({ error: 'URL is required' })
    return
  }

  try {
    const shortCode = nanoid(7)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // the url will expire after 30 days

    const newUrl = await Url.create({
      longUrl: url,
      shortCode,
      expiresAt,
    })
    const shortUrl = `${process.env.BASE_URL_PRODUCTION}/${newUrl.dataValues.shortCode}`
    res.status(200).json({ shortUrl })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export const redirectToLongUrl = async (
  req: Request<{ code: string }>,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.params
    const urlEntry = await Url.findOne({
      where: {
        shortCode: code,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
    })

    if (!urlEntry) {
      res.status(404).json({ error: 'URL not found' })
      return
    }

    res.status(301).redirect(urlEntry.longUrl)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
