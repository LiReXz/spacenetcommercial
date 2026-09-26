import { NextResponse } from "next/server";
import { sendMeetingEmail, type MeetingPayload } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: MeetingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid JSON" },
      { status: 400 }
    );
  }

  const { slot, name, email, company, interest, message, locale } = body ?? {};
  if (
    typeof slot !== "string" ||
    slot.length < 5 ||
    slot.length > 200 ||
    typeof name !== "string" ||
    name.trim().length < 2 ||
    typeof email !== "string" ||
    !EMAIL_RE.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 10
  ) {
    return NextResponse.json(
      { ok: false, error: "invalid fields" },
      { status: 400 }
    );
  }

  const delivered = await sendMeetingEmail({
    slot,
    name: name.trim(),
    email: email.trim(),
    company,
    interest,
    message: message.trim(),
    locale: locale === "en" || locale === "es" ? locale : undefined,
  });

  return NextResponse.json({ ok: true, delivered });
}
