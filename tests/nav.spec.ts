import { test, expect } from "@playwright/test";

const NAV_TARGETS = [
  { name: "Platform", path: "/platform", id: "platform" },
  { name: "Technology", path: "/technology", id: "technology" },
  { name: "Use Cases", path: "/use-cases", id: "use-cases" },
  { name: "Developers", path: "/developers", id: "developers" },
  { name: "Security", path: "/security", id: "security" },
];

const ROUTES = [
  { path: "/product", id: "mininode" },
  ...NAV_TARGETS.map(({ path, id }) => ({ path, id })),
];

test.describe("routes", () => {
  for (const { path, id } of ROUTES) {
    test(`${path} renders its section and the contact CTA`, async ({
      page,
    }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator(`#${id}`)).toBeVisible();
      await expect(page.locator("#contact")).toBeAttached();
    });
  }

  test("/product#helm deep-links to the Helm card", async ({ page }) => {
    await page.goto("/product#helm");
    await expect(page.locator("#helm")).toBeInViewport({ timeout: 8000 });
  });
});

test.describe("mobile menu (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const { name, path, id } of NAV_TARGETS) {
    test(`"${name}" navigates to ${path}`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("banner")
        .getByRole("link", { name, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport({ timeout: 8000 });
    });
  }

  test('"Contact us" scrolls to #contact', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Contact us", exact: true })
      .click();
    await expect(page.locator("#contact")).toBeInViewport({ timeout: 8000 });
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test("menu closes after navigating", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Platform", exact: true })
      .click();
    await expect(page).toHaveURL(/\/platform$/);
    await expect(
      page.getByRole("button", { name: "Open menu" })
    ).toBeVisible();
  });

  test("page is not scrollable while menu is open", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.mouse.move(195, 400);
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("tapping outside the menu closes it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    // Backdrop is exposed below the menu panel
    await page.mouse.click(195, 820);
    await expect(
      page.getByRole("button", { name: "Open menu" })
    ).toBeVisible();
  });
});

test.describe("desktop nav (1280px)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("nav link navigates to its page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Platform", exact: true })
      .click();
    await expect(page).toHaveURL(/\/platform$/);
    await expect(page.locator("#platform")).toBeInViewport({ timeout: 8000 });
  });

  test("active page is marked with aria-current", async ({ page }) => {
    await page.goto("/security");
    await expect(
      page
        .getByRole("banner")
        .getByRole("link", { name: "Security", exact: true })
    ).toHaveAttribute("aria-current", "page");
  });
});

test("no horizontal overflow at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/product"]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `overflow on ${path}`).toBeLessThanOrEqual(0);
  }
});

test("schedule a meeting opens the calendar dialog", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pick a date & time" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("every in-page #href resolves to an existing element", async ({
  page,
}) => {
  for (const path of ["/", "/product"]) {
    await page.goto(path);
    const missing = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href^="#"]'))
        .map((a) => a.getAttribute("href")!)
        .filter((h) => h.length > 1 && !document.getElementById(h.slice(1)))
    );
    expect(missing, `missing anchors on ${path}`).toEqual([]);
  }
});
