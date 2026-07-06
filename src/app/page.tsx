import Link from "next/link";
import { Logo } from "@/components/ui";

const FEATURES = [
  ["⚡", "Live preview", "Watch your resume update instantly as you type — no refresh, no waiting."],
  ["🎯", "ATS friendly", "Clean structure that applicant tracking systems can actually read."],
  ["🎨", "Premium templates", "Switch designs anytime — your content stays exactly where it is."],
  ["📄", "PDF export", "Pixel-perfect A4 output, ready to send to any employer."],
  ["✏️", "Easy editing", "Guided steps, smart hints, and one bullet per line. That's it."],
  ["📱", "Works everywhere", "Build on your laptop, polish on your phone."],
];

const STEPS = [
  ["1", "Enter your details", "A guided form walks you through each section — no blank-page anxiety."],
  ["2", "Choose a template", "Pick from professional designs and personalize colors and fonts."],
  ["3", "Download your PDF", "Export a polished, A4-ready resume in one click."],
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-extrabold text-navy">
              CV Creator <span className="text-primary">Pro</span>
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl bg-primary px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,.28)] transition hover:bg-blue-700"
          >
            Create my resume
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-12 px-6 pb-20 pt-16">
        <div className="max-w-xl flex-1 basis-[440px]">
          <div className="mb-5 inline-block rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold tracking-wide text-accent">
            RESUME READY IN UNDER 5 MINUTES
          </div>
          <h1 className="text-[clamp(34px,5vw,54px)] font-extrabold leading-[1.08] tracking-tight text-navy">
            Create a professional resume in minutes
          </h1>
          <p className="mb-8 mt-5 max-w-md text-lg leading-relaxed text-slate-500">
            No design skills required. Enter your information, choose a beautiful template, and
            download a polished PDF.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,.28)] transition hover:bg-blue-700"
            >
              Create my resume
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-ink transition hover:bg-slate-50"
            >
              View templates
            </Link>
          </div>
        </div>

        {/* Hero mock resume */}
        <div className="flex flex-1 basis-[360px] justify-center py-2">
          <div className="w-[340px] rotate-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-lift">
            <div className="mb-3.5 border-l-4 border-primary pl-3">
              <div className="text-[17px] font-extrabold text-navy">Sara Al Mahmood</div>
              <div className="text-[11px] font-semibold text-primary">Senior Graphic Designer</div>
            </div>
            {[92, 100, 76].map((w, i) => (
              <div key={i} className="mb-1.5 h-[7px] rounded bg-slate-100" style={{ width: `${w}%` }} />
            ))}
            <div className="mb-1.5 mt-3 text-[9.5px] font-extrabold tracking-widest text-primary">
              EXPERIENCE
            </div>
            {[100, 88, 95, 70].map((w, i) => (
              <div key={i} className="mb-1.5 h-[7px] rounded bg-slate-100" style={{ width: `${w}%` }} />
            ))}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Branding", "Figma", "Print"].map((s) => (
                <span key={s} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-bold text-accent">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white px-6 py-18 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-11 text-center text-3xl font-extrabold tracking-tight text-navy">
            How it works
          </h2>
          <div className="grid gap-7 sm:grid-cols-3">
            {STEPS.map(([n, t, d]) => (
              <div key={n} className="px-2 text-center">
                <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-xl font-extrabold text-white" style={{ width: 52, height: 52 }}>
                  {n}
                </div>
                <div className="mb-1.5 text-[17px] font-bold text-navy">{t}</div>
                <div className="text-sm leading-relaxed text-slate-500">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-18 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-11 text-center text-3xl font-extrabold tracking-tight text-navy">
            Everything you need to get hired
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(([icon, t, d]) => (
              <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="mb-2.5 text-2xl">{icon}</div>
                <div className="mb-1.5 font-bold text-navy">{t}</div>
                <div className="text-sm leading-relaxed text-slate-500">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-navy to-blue-900 px-10 py-14 text-center">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white">
            Your next job starts with a better resume
          </h2>
          <p className="mb-6 text-slate-300">Free to try. No design skills needed.</p>
          <Link
            href="/dashboard"
            className="inline-block rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(16,185,129,.28)] transition hover:bg-emerald-600"
          >
            Start building — it&apos;s free
          </Link>
        </div>
        <p className="mt-9 text-center text-[13px] text-slate-500">
          © {new Date().getFullYear()} CV Creator Pro
        </p>
      </section>
    </div>
  );
}
