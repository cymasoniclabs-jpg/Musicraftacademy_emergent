// src/features/forms/utils/submitEnquiryDual.ts
export type EnquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  program?: string;        // e.g. "Beginner", or service interest
  intent?: string;         // e.g. "Enrol now", "Contact"
  message?: string;
  consent_at?: string;     // ISO string when user gave consent
  // optional marketing/session context
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
};

// ---- Configure your endpoints here (or move to Vite envs) ----
const SUPABASE_FN_URL = import.meta.env.VITE_EDGE_URL 
  ? `${import.meta.env.VITE_EDGE_URL}/create-enquiry`
  : null; // No fallback - requires proper configuration

// Formspree endpoints
const FORMSPREE_CONTACT = "https://formspree.io/f/xwprkkjr";   // contact details
const FORMSPREE_PREASSESS = "https://formspree.io/f/meorqory"; // pre-assessment wizard

// small fetch with timeout
async function postJSON(url: string, body: unknown, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      mode: "cors",
    });
    const ok = res.ok;
    // Formspree returns JSON with {ok:true} on success; Supabase returns {success:true}
    const data = await res.json().catch(() => ({} as any));
    return { ok, data, status: res.status, url };
  } finally {
    clearTimeout(t);
  }
}

/**
 * Submit to Supabase AND Formspree.
 * - If both succeed: returns {ok:true, channels:['supabase','formspree']}
 * - If one succeeds: returns {ok:true, channels:[...], warnings:[...]}
 * - If both fail: throws with details.
 */
export async function submitEnquiryDual(
  base: EnquiryPayload,
  opts?: { kind?: "contact" | "preassessment" }
) {
  // Enrich with context
  const payload: EnquiryPayload = {
    ...base,
    consent_at: base.consent_at ?? new Date().toISOString(),
    referrer: base.referrer ?? (typeof document !== "undefined" ? document.referrer || null : null),
    userAgent: base.userAgent ?? (typeof navigator !== "undefined" ? navigator.userAgent : null),
    utm_source:
      base.utm_source ??
      new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("utm_source"),
    utm_medium:
      base.utm_medium ??
      new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("utm_medium"),
    utm_campaign:
      base.utm_campaign ??
      new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("utm_campaign"),
    utm_term:
      base.utm_term ??
      new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("utm_term"),
    utm_content:
      base.utm_content ??
      new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("utm_content"),
  };

  // Choose which Formspree bucket you want for this call
  const formspreeUrl = opts?.kind === "preassessment" ? FORMSPREE_PREASSESS : FORMSPREE_CONTACT;

  // Fire both (no dependency) - only if Supabase URL is configured
  const promises: Promise<any>[] = [
    postJSON(formspreeUrl, {
      // Formspree is happy with arbitrary fields; keep them flat for email readability
      ...payload,
      _subject:
        opts?.kind === "preassessment"
          ? "New Pre-Assessment submission (Musicraft)"
          : "New Contact / Enquiry (Musicraft Academy)",
    }),
  ];

  // Only add Supabase request if URL is configured
  if (SUPABASE_FN_URL) {
    promises.unshift(postJSON(SUPABASE_FN_URL, payload));
  }

  const results = await Promise.allSettled(promises);
  const [supabaseRes, formspreeRes] = SUPABASE_FN_URL 
    ? [results[0], results[1]] 
    : [null, results[0]];

  const channels: string[] = [];
  const warnings: string[] = [];

  // Analyze Supabase result
  if (SUPABASE_FN_URL) {
    if (supabaseRes && supabaseRes.status === "fulfilled" && supabaseRes.value.ok) {
      channels.push("supabase");
    } else if (supabaseRes) {
      warnings.push(
        `Supabase failed: ${
          supabaseRes.status === "rejected"
            ? supabaseRes.reason?.message || "request error"
            : `${supabaseRes.value.status}`
        }`
      );
    }
  } else {
    warnings.push("Supabase not configured (VITE_EDGE_URL missing)");
  }

  // Analyze Formspree result (expects ok:true in JSON)
  if (
    formspreeRes.status === "fulfilled" &&
    (formspreeRes.value.ok || formspreeRes.value.data?.ok)
  ) {
    channels.push("formspree");
  } else {
    warnings.push(
      `Formspree failed: ${
        formspreeRes.status === "rejected"
          ? formspreeRes.reason?.message || "request error"
          : `${formspreeRes.value.status}`
      }`
    );
  }

  if (channels.length === 0) {
    // both failed
    const err = new Error("Submission failed to both Supabase and Formspree");
    (err as any).details = { supabaseRes, formspreeRes };
    throw err;
  }

  return { ok: true, channels, warnings };
}