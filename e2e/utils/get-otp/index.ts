import { Page } from '@playwright/test';
import { mailPage } from '../mail-page';
import { getLastMail } from '../get-last-email';

export interface Options {
  emailCliente: string;
}

export const getOtpCodeEmail = async (page: Page, options: Options) => {
  const { emailCliente } = options;

  while (true) {
    const lastEmail = await getLastMail(page, { emailCliente });
    await page.close();
    const regex = /<strong><span style="font-size:30px">(\d{6})<\/span><\/strong>/;

    // Usar la expresión regular para extraer el código OTP
    const match = lastEmail.html.match(regex);

    if (!match) continue;

    const otp = match[1];
    return otp;
  }
};
