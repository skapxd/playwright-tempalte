import { Page } from "@playwright/test";
import { writeFileSync } from "fs";
import { join } from "path";
import { delayAction } from "../delay-action";
import { delay } from "../duration";

interface Options {
  path: string;
  email: string;
  password: string;
  url: string;
}

export const login = async (page: Page, options: Options) => {
  const { email, password, path, url } = options ?? {};

  await page.goto(url);
  await delayAction();

  await page.getByRole("button", { name: "Login" }).click();
  await delayAction();

  await page.getByPlaceholder("Email, phone, or Skype").fill(email);
  await delayAction();

  await page.getByRole("button", { name: "Next" }).click();
  await delayAction();

  await page.getByPlaceholder("Password").fill(password);
  await delayAction();

  await page.getByRole("button", { name: "Sign in" }).click();
  await delayAction();

  await page.getByRole("button", { name: "Yes" }).click();
  await delayAction();

  await page.waitForURL(url);
  await delayAction();

  await page.context().storageState({ path: join(path, "cookie.json") });
  await delay({ seconds: 5 });

  // Get session storage and store as env variable
  const { session, local } = await page.evaluate(async () => {
    //
    const sessionStorage = window.sessionStorage;
    const session: Record<string, string | null> = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (
        typeof key === "string" &&
        key.match(/windows|active-account|msal/) != null
      ) {
        session[key] = sessionStorage.getItem(key);
      }
    }
    //
    const localStorage = window.localStorage;
    const local: Record<string, string | null> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        typeof key === "string" &&
        key.match(/windows|active-account|msal/) != null
      ) {
        local[key] = localStorage.getItem(key);
      }
    }
    return {
      session,
      local,
    };
  });

  writeFileSync(
    join(path, "sessionStorage.json"),
    JSON.stringify(session, null, 2),
    "utf-8"
  );

  writeFileSync(
    join(path, "localStorage.json"),
    JSON.stringify(local, null, 2),
    "utf-8"
  );
};
