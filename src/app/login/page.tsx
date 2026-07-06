"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Btn, Field, Logo } from "@/components/ui";

function LoginInner() {
  const supabase = createClient();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`;

  const signInWithEmail = async () => {
    if (!email.trim()) return;
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    setStatus(error ? "error" : "sent");
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lift">
        <Link href="/" className="mb-6 flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-extrabold text-navy">
            CV Creator <span className="text-primary">Pro</span>
          </span>
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">Welcome back</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500">
          Sign in to save your resumes and pick up where you left off.
        </p>

        <Btn kind="ghost" className="w-full" onClick={signInWithGoogle}>
          Continue with Google
        </Btn>

        <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span className="h-px flex-1 bg-slate-200" /> or <span className="h-px flex-1 bg-slate-200" />
        </div>

        {status === "sent" ? (
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
            Check your inbox — we sent you a magic sign-in link.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Field
              label="Email address"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && signInWithEmail()}
            />
            <Btn onClick={signInWithEmail} disabled={status === "sending"}>
              {status === "sending" ? "Sending link…" : "Email me a magic link"}
            </Btn>
            {status === "error" && (
              <p className="text-sm text-red-600">Something went wrong — please try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
