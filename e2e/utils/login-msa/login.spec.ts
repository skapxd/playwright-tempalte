import test from "@playwright/test";
import { loginState } from "./login-state";

test("login-with-msa", async ({ page }) => {
  await loginState(page, {
    path: __dirname,
    url: "https://adminonboardingqa.azurewebsites.net",
  });

  await page.locator("td:nth-child(2)").first().isVisible();
});
