import { Browser, Page } from "@playwright/test";
import { readFileSync } from "fs";
import { join } from "path";
import { delayAction } from "../delay-action";

interface Options {
  path: string;
  goTo: string;
}
export const loadAuth = async (page: Page, options: Options) => {
  const { path, goTo } = options ?? {};

  const sessionStorage = JSON.parse(
    readFileSync(join(path, "sessionStorage.json"), "utf-8")
  );

  await page.context().addInitScript((storage) => {
    for (const [key, value] of Object.entries(storage)) {
      // @ts-expect-error: ERR
      window.sessionStorage.setItem(key, value);
    }
  }, sessionStorage);
  await delayAction();

  await delayAction();

  await page.goto(goTo);
  return page;
};
