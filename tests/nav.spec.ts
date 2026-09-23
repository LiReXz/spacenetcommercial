import { test, expect } from "@playwright/test";

const NAV_TARGETS = [
  { name: "Platform", id: "platform" },
  { name: "Technology", id: "technology" },
  { name: "Use Cases", id: "use-cases" },
  { name: "Developers", id: "developers" },
  { name: "Security", id: "security" },
];

test.describe("mobile menu (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const { name, id } of NAV_TARGETS) {
    test(`"${name}" scrolls to #${id}`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("banner")
        .getByRole("link", { name, exact: true })
        .click();
      await expect(page.locator(`#${id}`)).toBeInViewport({ timeout: 8000 });
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    });
  }

  test("menu closes after navigating", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Platform", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Open menu" })
    ).toBeVisible();
  });
});

test.describe("desktop nav (1280px)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("nav link scrolls to section", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Platform", exact: true })
      .click();
    await expect(page.locator("#platform")).toBeInViewport({ timeout: 8000 });
  });
});

test("every in-page #href resolves to an existing element", async ({
  page,
}) => {
  await page.goto("/");
  const missing = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href^="#"]'))
      .map((a) => a.getAttribute("href")!)
      .filter((h) => h.length > 1 && !document.getElementById(h.slice(1)))
  );
  expect(missing).toEqual([]);
});
