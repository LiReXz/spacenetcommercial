// Shared inbox for contact + meeting requests. Used by the mailto:
// fallback (client) and as the default recipient in lib/mail (server).
// TODO: set the real inbox — pending until the contact address is decided.
// The API path overrides it with CONTACT_EMAIL in .env.local.
export const CONTACT_EMAIL = "";
