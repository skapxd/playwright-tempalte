import { Page } from '@playwright/test'
import { delay } from '../duration'
import type { Mails } from "./index.d"

export interface Options {
  mail: string
}

export const mailPage = async (page: Page, options: Options): Promise<Mails> => {
  const { mail } = options
  let counter = 0

  while (counter < 10) {
    counter++

    await page.goto(`https://restmail.net/mail/${mail}`)
    await delay({ seconds: 10 })
    
    await page.reload()

    const jsonAsString = await page.textContent('pre')

    if (jsonAsString == null) throw new Error('No se encontró el correo')

    const json = JSON.parse(jsonAsString)

    if (Array.isArray(json) === false) throw new Error('No se encontró el correo')

    if (json.length === 0) continue

    return json
  }

  throw new Error('No se encontró el correo')
}
