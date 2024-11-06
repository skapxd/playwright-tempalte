import { test, expect } from "@playwright/test";
import { mouseHelper } from "./utils/mouse-helper";
import { delayDuration } from "./utils/delay-action";

test("get started link", async ({ page }) => {
  await mouseHelper(page);
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page
    .getByRole("link", { name: "Get started" })
    .click({ delay: delayDuration });

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
