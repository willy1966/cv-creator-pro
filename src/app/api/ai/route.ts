import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/* Each user gets this many AI Assist calls per day (see consume_ai_credit
   in supabase/schema.sql). Keeps any single account's cost to pennies. */
const DAILY_LIMIT = 20;

const MODES: Record<string, string> = {
  improve:
    "Improve this resume text. Keep it truthful to the content given, make it concise, achievement-oriented, and professional. Return ONLY the improved text, no preamble.",
  professional:
    "Rewrite this resume text in a professional tone. Return ONLY the rewritten text, no preamble.",
  concise:
    "Rewrite this resume text to be as concise as possible without losing meaning. Return ONLY the rewritten text, no preamble.",
  executive:
    "Rewrite this resume text in a confident executive tone with strong action verbs. Return ONLY the rewritten text, no preamble.",
};

export async function POST(request: Request) {
  // Require a signed-in user so the endpoint can't be abused anonymously.
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI assistant is not configured (missing ANTHROPIC_API_KEY)." },
      { status: 501 }
    );
  }

  const { text, mode } = await request.json();
  if (typeof text !== "string" || !text.trim() || text.length > 4000) {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }

  /* Per-user daily rate limit, counted atomically in the database. */
  const { data: allowed, error: limitError } = await supabase.rpc("consume_ai_credit", {
    p_limit: DAILY_LIMIT,
  });
  if (limitError) {
    return NextResponse.json({ error: "AI request failed" }, { status: 502 });
  }
  if (!allowed) {
    return NextResponse.json(
      { error: `Daily AI limit reached (${DAILY_LIMIT} per day). Try again tomorrow.` },
      { status: 429 }
    );
  }
  const instruction = MODES[mode] ?? MODES.improve;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      messages: [{ role: "user", content: `${instruction}\n\nText:\n${text}` }],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "AI request failed" }, { status: 502 });
  }

  const data = await res.json();
  const improved = Array.isArray(data.content)
    ? data.content
        .filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("\n")
        .trim()
    : "";

  return NextResponse.json({ text: improved });
}
