import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Exchanges the auth code (magic link / OAuth) for a session cookie.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  /* Behind a reverse proxy (production hosting), request.url carries the
     internal bind address (e.g. 0.0.0.0:3000). Build redirects from the
     forwarded headers so users land on the public domain. */
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const baseUrl = forwardedHost ? `${forwardedProto}://${forwardedHost}` : origin;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }
  return NextResponse.redirect(`${baseUrl}/login?error=auth`);
}
