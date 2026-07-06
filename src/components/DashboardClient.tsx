"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Btn, Card, Logo } from "@/components/ui";
import { ResumeRow, EMPTY_RESUME, DEFAULT_SECTIONS, TEMPLATES } from "@/lib/types";

export default function DashboardClient({
  initialResumes,
  userEmail,
}: {
  initialResumes: ResumeRow[];
  userEmail: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [resumes, setResumes] = useState(initialResumes);
  const [busy, setBusy] = useState(false);

  const createResume = async () => {
    setBusy(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: user.id,
        title: "Untitled resume",
        data: EMPTY_RESUME,
        sections: DEFAULT_SECTIONS,
      })
      .select()
      .single();
    setBusy(false);
    if (!error && data) router.push(`/builder/${data.id}`);
  };

  const duplicateResume = async (r: ResumeRow) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("resumes")
      .insert({
        user_id: user.id,
        title: `${r.title} (copy)`,
        template: r.template,
        accent: r.accent,
        font: r.font,
        sections: r.sections,
        data: r.data,
      })
      .select()
      .single();
    if (data) setResumes((prev) => [data as ResumeRow, ...prev]);
  };

  const renameResume = async (r: ResumeRow) => {
    const title = window.prompt("Rename resume", r.title);
    if (!title || title === r.title) return;
    await supabase.from("resumes").update({ title }).eq("id", r.id);
    setResumes((prev) => prev.map((x) => (x.id === r.id ? { ...x, title } : x)));
  };

  const deleteResume = async (r: ResumeRow) => {
    if (!window.confirm(`Delete "${r.title}"? This cannot be undone.`)) return;
    await supabase.from("resumes").delete().eq("id", r.id);
    setResumes((prev) => prev.filter((x) => x.id !== r.id));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const templateName = (id: string) => TEMPLATES.find((t) => t.id === id)?.name ?? id;

  /* Locale-independent date so server and client render identical HTML
     (Date#toLocaleDateString caused a hydration mismatch). */
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="font-extrabold text-navy">
              CV Creator <span className="text-primary">Pro</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-500 sm:inline">{userEmail}</span>
            <Btn kind="ghost" small onClick={signOut}>Sign out</Btn>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-navy">My resumes</h1>
            <p className="mt-1 text-sm text-slate-500">
              {resumes.length === 0
                ? "Create your first resume — it takes about 5 minutes."
                : `${resumes.length} resume${resumes.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <Btn onClick={createResume} disabled={busy}>
            {busy ? "Creating…" : "+ Create new resume"}
          </Btn>
        </div>

        {resumes.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="text-4xl">📄</div>
            <div className="text-lg font-bold text-navy">No resumes yet</div>
            <p className="max-w-sm text-sm text-slate-500">
              Start with a blank resume — you can switch templates, colors, and fonts anytime
              without losing your work.
            </p>
            <Btn onClick={createResume} disabled={busy}>Create my first resume</Btn>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((r) => (
              <Card key={r.id} className="flex flex-col gap-3">
                <Link
                  href={`/builder/${r.id}`}
                  className="group flex h-36 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 transition hover:bg-blue-50"
                >
                  <div className="w-20 rounded bg-white p-2 shadow-soft transition group-hover:scale-105">
                    <div className="mb-1 h-1.5 w-3/4 rounded-sm" style={{ background: r.accent }} />
                    {[100, 85, 92, 70, 88].map((w, i) => (
                      <div key={i} className="mb-1 h-1 rounded-sm bg-slate-100" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </Link>
                <div>
                  <Link href={`/builder/${r.id}`} className="font-bold text-navy hover:text-primary">
                    {r.title}
                  </Link>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {templateName(r.template)} · edited {formatDate(r.updated_at)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Btn kind="ghost" small onClick={() => renameResume(r)}>Rename</Btn>
                  <Btn kind="ghost" small onClick={() => duplicateResume(r)}>Duplicate</Btn>
                  <Btn kind="danger" small className="ml-auto" onClick={() => deleteResume(r)}>Delete</Btn>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
