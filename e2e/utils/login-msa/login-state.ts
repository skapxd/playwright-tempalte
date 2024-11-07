import { Page } from "@playwright/test";

import { login } from "./#login";
import { hasCredentials } from "./#has-credentials";
import { loadAuth } from "./#load-auth";
import { readCredentials } from "./#read-credentials";

interface Options {
  path: string;
  url: string;
}

export const loginState = async (page: Page, options: Options) => {
  const { path, url } = options ?? {};

  const { path: credsPath, status } = await hasCredentials(path);

  if (!status) {
    const { email, pass } = await readCredentials(path);

    await login(page, {
      email,
      password: pass,
      url,
      path: credsPath,
    });
  } else {
    await loadAuth(page, { path: credsPath, goTo: url });
  }
};
