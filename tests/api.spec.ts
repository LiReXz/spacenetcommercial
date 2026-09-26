import { test, expect } from "@playwright/test";

test.describe("POST /api/contact", () => {
  test("rejects invalid payloads", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "x" },
    });
    expect(res.status()).toBe(400);
  });

  test("accepts a valid submission", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Jane Doe",
        email: "jane@company.com",
        company: "Acme",
        interest: "Process satellite data in orbit",
        message: "I'd like to know more about orbital compute.",
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    // delivered depends on RESEND_API_KEY — either way the request is accepted
    expect(typeof body.delivered).toBe("boolean");
  });
});

test.describe("POST /api/meeting", () => {
  test("rejects invalid payloads", async ({ request }) => {
    const res = await request.post("/api/meeting", {
      data: { slot: "x", email: "not-an-email" },
    });
    expect(res.status()).toBe(400);
  });

  test("accepts a valid slot request", async ({ request }) => {
    const res = await request.post("/api/meeting", {
      data: {
        slot: "Friday, October 3, 2026 · 10:00 (Europe/Madrid)",
        name: "Jane Doe",
        email: "jane@company.com",
        company: "Acme",
        interest: "Process satellite data in orbit",
        message: "Can your platform handle SAR imagery?",
        locale: "en",
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(typeof body.delivered).toBe("boolean");
  });
});
