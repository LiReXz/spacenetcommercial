import { Resend } from "resend";
import { CONTACT_EMAIL } from "./contact";

// Mail layer. When RESEND_API_KEY is set the site sends through Resend and
// callers get delivered:true. Without a key the request is logged and
// delivered:false is returned so the frontend falls back to a mailto: draft
// — messages still arrive until the key exists.
//
// Setup (.env.local):
//   RESEND_API_KEY=re_...
//   CONTACT_EMAIL=you@spacenet.com   (inbox that receives requests)
//   MAIL_FROM="SpaceNet <onboarding@resend.dev>"  (Resend's shared sender
//   works out of the box; swap for a verified domain sender later)

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  interest?: string;
  message: string;
}

export interface MeetingPayload {
  // Pre-formatted, localized — e.g. "Friday, October 3, 2026 · 10:00 (Europe/Madrid)"
  slot: string;
  name: string;
  email: string;
  company?: string;
  interest?: string; // becomes the meeting subject
  message: string;   // meeting description
  locale?: string;
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TO = process.env.CONTACT_EMAIL ?? CONTACT_EMAIL;
const FROM = process.env.MAIL_FROM ?? "SpaceNet <onboarding@resend.dev>";

async function send(msg: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!resend || !TO) {
    console.info(
      "[mail] delivery not configured (RESEND_API_KEY / CONTACT_EMAIL) — not delivered:",
      msg.subject
    );
    return false;
  }
  const { error } = await resend.emails.send({ from: FROM, to: TO, ...msg });
  if (error) {
    console.error("[mail] resend error:", error);
    return false;
  }
  return true;
}

export function sendContactEmail(p: ContactPayload) {
  return send({
    subject: `SpaceNet contact — ${p.name}`,
    replyTo: p.email,
    text: [
      `Name: ${p.name}`,
      `Email: ${p.email}`,
      `Company: ${p.company || "—"}`,
      `Interest: ${p.interest || "—"}`,
      "",
      p.message,
    ].join("\n"),
  });
}

export function sendMeetingEmail(p: MeetingPayload) {
  return send({
    subject: `SpaceNet meeting${p.interest ? ` — ${p.interest}` : ""}`,
    replyTo: p.email,
    text: [
      "Meeting request",
      "",
      `Slot: ${p.slot}`,
      `Name: ${p.name}`,
      `Email: ${p.email}`,
      `Company: ${p.company || "—"}`,
      `Topic: ${p.interest || "—"}`,
      "",
      p.message,
    ].join("\n"),
  });
}
