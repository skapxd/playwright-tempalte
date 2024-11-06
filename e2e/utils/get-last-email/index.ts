import { Page } from '@playwright/test';
import { mailPage } from '../mail-page';

export interface Options {
  emailCliente: string;
}

export const getLastMail = async (page: Page, options: Options) => {
  const { emailCliente } = options;
  const json = await mailPage(page, { mail: emailCliente });

  const mail = json.at(-1);

  if (mail == null) throw new Error('No se encontró el correo');

  return mail;
};
