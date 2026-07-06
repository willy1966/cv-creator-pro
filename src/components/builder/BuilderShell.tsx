"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Btn, Card, Field, Area, Logo } from "@/components/ui";
import { TEMPLATE_MAP } from "@/components/templates";
import TemplateGallery, { recordTemplateUse } from "@/components/templates/TemplateGallery";
import { SAMPLE_RESUME } from "@/lib/sample-data";
import { OptionalExtras } from "@/components/templates";
import {
  ResumeRow, ResumeData, SectionVisibility, TemplateId, FontId,
  EMPTY_RESUME, DEFAULT_SECTIONS, SECTION_TOGGLES, TEMPLATES,
  ACCENT_CHOICES, FONT_STACKS,
} from "@/lib/types";

const STEP_META = [
  { id: "personal", label: "Personal", title: "Personal information", sub: "How employers will reach you." },
  { id: "summary", label: "Summary", title: "Professional summary", sub: "Your elevator pitch — the first thing recruiters read." },
  { id: "skills", label: "Skills", title: "Skills & languages", sub: "Your strongest skills, in order of relevance." },
  { id: "experience", label: "Experience", title: "Work experience", sub: "Most recent role first. Each line becomes a bullet." },
  { id: "education", label: "Education", title: "Education & certifications", sub: "Degrees, schools, and any certifications." },
  { id: "extras", label: "Extras", title: "Optional sections", sub: "Projects, awards, references, volunteer work, publications, and more." },
  { id: "finish", label: "Finish", title: "Finishing touches", sub: "Toggle sections and export your resume." },
] as const;

type SaveState = "saved" | "saving" | "error";

export default function BuilderShell({ initial }: { initial: ResumeRow }) {
  const supabase = createClient();

  const [data, setData] = useState<ResumeData>(
    Object.keys(initial.data ?? {}).length ? { ...EMPTY_RESUME, ...initial.data } : EMPTY_RESUME
  );
  const [title, setTitle] = useState(initial.title);
  const [templateId, setTemplateId] = useState<TemplateId>(initial.template);
  const [accent, setAccent] = useState(initial.accent);
  const [fontId, setFontId] = useState<FontId>(initial.font);
  /* Merge with defaults so resumes saved before new optional sections were
     added get them enabled (their data-empty state keeps them invisible). */
  const [sections, setSections] = useState<SectionVisibility>({
    ...DEFAULT_SECTIONS,
    ...initial.sections,
  });
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(70);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [galleryOpen, setGalleryOpen] = useState(false);

  /* ---------- autosave (debounced) ---------- */
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSaveState("saving");
    const t = setTimeout(async () => {
      const { error } = await supabase
        .from("resumes")
        .update({ data, title, template: templateId, accent, font: fontId, sections })
        .eq("id", initial.id);
      setSaveState(error ? "error" : "saved");
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, title, templateId, accent, fontId, sections]);

  /* ---------- photo upload to Supabase Storage ---------- */
  const uploadPhoto = useCallback(
    async (file: File) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const path = `${user.id}/${initial.id}-${Date.now()}.${file.name.split(".").pop() || "jpg"}`;
      const { error } = await supabase.storage.from("photos").upload(path, file, { upsert: true });
      if (error) return;
      const { data: pub } = supabase.storage.from("photos").getPublicUrl(path);
      setData((d) => ({ ...d, personal: { ...d.personal, photo: pub.publicUrl } }));
    },
    [supabase, initial.id]
  );

  /* ---------- AI assist ---------- */
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState("");
  const improveSummary = async (mode: string) => {
    if (!data.summary.trim() || aiBusy) return;
    setAiBusy(true);
    setAiError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: data.summary, mode }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "AI request failed");
      if (json.text) setData((d) => ({ ...d, summary: json.text }));
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "AI request failed");
    } finally {
      setAiBusy(false);
    }
  };

  const onPrint = () => {
    window.print();
  };
  const progress = ((step + 1) / STEP_META.length) * 100;
  const Template = TEMPLATE_MAP[templateId] ?? TEMPLATE_MAP.modern;
  const scale = zoom / 100;
  const isEmpty = JSON.stringify(data) === JSON.stringify(EMPTY_RESUME);

  /* ================= form pane ================= */
  const formPane = (
    <div className="flex h-full min-h-0 flex-col">
      {/* progress */}
      <div className="px-5 pt-3.5">
        <div className="mb-2 flex flex-wrap justify-between gap-1">
          {STEP_META.map((s, i) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setStep(i)}
              className={`px-1 text-[11.5px] font-bold tracking-wide ${
                i === step ? "text-primary" : i < step ? "text-accent" : "text-slate-400"
              }`}
            >
              {i < step ? "✓ " : ""}{s.label}
            </button>
          ))}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* step content */}
      <div className="min-h-0 flex-1 overflow-auto p-5">
        <h2 className="text-[19px] font-extrabold text-navy">{STEP_META[step].title}</h2>
        <p className="mb-4 mt-0.5 text-[13px] text-slate-500">{STEP_META[step].sub}</p>

        {STEP_META[step].id === "personal" && (
          <PersonalStep data={data} setData={setData} uploadPhoto={uploadPhoto} />
        )}
        {STEP_META[step].id === "summary" && (
          <div className="flex flex-col gap-3">
            <Area
              label="Professional summary"
              rows={7}
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              placeholder="A short paragraph highlighting your experience, strengths, and what you bring to the role…"
              hint="Tip: 2–4 sentences works best. Lead with years of experience and your biggest achievement."
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">AI assist</span>
              {[["improve", "✨ Improve"], ["professional", "Professional tone"], ["concise", "Concise"], ["executive", "Executive"]].map(([mode, label]) => (
                <Btn key={mode} kind="ghost" small disabled={aiBusy || !data.summary.trim()} onClick={() => improveSummary(mode)}>
                  {aiBusy ? "…" : label}
                </Btn>
              ))}
            </div>
            {aiError && <p className="text-sm text-red-600">{aiError}</p>}
          </div>
        )}
        {STEP_META[step].id === "skills" && <SkillsStep data={data} setData={setData} />}
        {STEP_META[step].id === "experience" && <ExperienceStep data={data} setData={setData} />}
        {STEP_META[step].id === "education" && <EducationStep data={data} setData={setData} />}
        {STEP_META[step].id === "extras" && (
          <ExtrasStep data={data} setData={setData} sections={sections} />
        )}
        {STEP_META[step].id === "finish" && (
          <FinishStep sections={sections} setSections={setSections} onPrint={onPrint} />
        )}
      </div>

      {/* nav */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3.5">
        <Btn kind="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          Back
        </Btn>
        <div className="flex gap-2.5">
          {isEmpty && (
            <Btn kind="ghost" onClick={() => setData(SAMPLE_RESUME)}>Load sample data</Btn>
          )}
          {step < STEP_META.length - 1 ? (
            <Btn onClick={() => setStep(step + 1)}>Continue →</Btn>
          ) : (
            <Btn kind="accent" onClick={onPrint}>Download PDF</Btn>
          )}
        </div>
      </div>
    </div>
  );

  /* ================= preview pane ================= */
  const previewPane = (
    <div className="flex h-full min-h-0 flex-col">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2.5 bg-navy px-3.5 py-2.5">
        <select
          aria-label="Resume template"
          value={templateId}
          onChange={(e) => {
            const id = e.target.value as TemplateId;
            setTemplateId(id);
            recordTemplateUse(id);
          }}
          className="rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-[12.5px] font-semibold text-white"
        >
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>{t.name} template</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setGalleryOpen(true)}
          className="rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-slate-700"
        >
          🎨 Gallery
        </button>
        <select
          aria-label="Resume font"
          value={fontId}
          onChange={(e) => setFontId(e.target.value as FontId)}
          className="rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-[12.5px] font-semibold text-white"
        >
          <option value="sans">Modern Sans</option>
          <option value="serif">Classic Serif</option>
          <option value="rounded">Rounded</option>
        </select>
        <div className="ml-auto flex gap-1.5">
          {ACCENT_CHOICES.map((a) => (
            <button
              type="button"
              key={a.value}
              title={a.name}
              aria-label={`Accent color ${a.name}`}
              onClick={() => setAccent(a.value)}
              className="h-[22px] w-[22px] rounded-full"
              style={{
                background: a.value,
                border: accent === a.value ? "2.5px solid #fff" : "2.5px solid transparent",
                boxShadow: accent === a.value ? `0 0 0 2px ${a.value}` : "none",
              }}
            />
          ))}
        </div>
      </div>
      {/* zoom bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3.5 py-2">
        <span className="text-[13px] font-bold text-ink">Live preview</span>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Zoom out" onClick={() => setZoom(Math.max(40, zoom - 10))} className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-[15px]">−</button>
          <span className="w-10 text-center text-xs font-semibold text-slate-500">{zoom}%</span>
          <button type="button" aria-label="Zoom in" onClick={() => setZoom(Math.min(120, zoom + 10))} className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-[15px]">+</button>
        </div>
      </div>
      {/* page */}
      <div className="min-h-0 flex-1 overflow-auto bg-slate-200/60 p-6">
        <div style={{ width: 794 * scale, margin: "0 auto" }}>
          <div
            id="cvp-page"
            className="rounded bg-white shadow-lift"
            style={{
              width: 794, minHeight: 1123,
              transform: `scale(${scale})`, transformOrigin: "top left",
              transition: "transform .2s ease",
            }}
          >
            <Template resume={{ data, accent, font: FONT_STACKS[fontId], sections }} />
            <OptionalExtras resume={{ data, accent, font: FONT_STACKS[fontId], sections }} />
          </div>
        </div>
      </div>
    </div>
  );

  /* ================= layout ================= */
  return (
    <div className="flex h-screen flex-col bg-surface">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo size={26} />
          </Link>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="min-w-0 max-w-[240px] truncate rounded-lg border border-transparent bg-transparent px-2 py-1 text-[15px] font-bold text-navy outline-none transition hover:border-slate-200 focus:border-primary"
            aria-label="Resume title"
          />
          <span className={`hidden text-xs font-semibold sm:inline ${
            saveState === "saved" ? "text-emerald-600" : saveState === "saving" ? "text-slate-400" : "text-red-500"
          }`}>
            {saveState === "saved" ? "✓ Saved" : saveState === "saving" ? "Saving…" : "Save failed — retrying on next edit"}
          </span>
        </div>
        {/* mobile tabs */}
        <div className="flex rounded-xl bg-surface p-0.5 md:hidden">
          {(["edit", "preview"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setMobileTab(t)}
              className={`rounded-lg px-4 py-1.5 text-[13px] font-bold ${
                mobileTab === t ? "bg-white text-primary shadow-soft" : "text-slate-500"
              }`}
            >
              {t === "edit" ? "Edit" : "Preview"}
            </button>
          ))}
        </div>
        <Link href="/dashboard" className="hidden text-sm font-semibold text-slate-500 hover:text-primary md:inline">
          ← My resumes
        </Link>
      </header>

      {/* desktop split / mobile tabs */}
      <div className="hidden min-h-0 flex-1 md:grid md:grid-cols-[minmax(420px,46%)_1fr]">
        <div className="flex min-h-0 flex-col border-r border-slate-200 bg-white">{formPane}</div>
        <div className="flex min-h-0 flex-col">{previewPane}</div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col md:hidden">
        {mobileTab === "edit" ? formPane : previewPane}
      </div>

      {galleryOpen && (
        <TemplateGallery
          currentId={templateId}
          accent={accent}
          onUse={(id) => setTemplateId(id)}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
}

/* ============================================================
   STEP COMPONENTS
   ============================================================ */

type StepProps = {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
};

function PersonalStep({ data, setData, uploadPhoto }: StepProps & { uploadPhoto: (f: File) => void }) {
  const p = data.personal;
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (k: keyof typeof p) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, personal: { ...p, [k]: e.target.value } });

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {/* photo */}
      <div className="flex items-center gap-4 sm:col-span-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label={p.photo ? "Change photo" : "Upload photo"}
          title={p.photo ? "Change photo" : "Upload photo"}
          className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full text-2xl"
          style={{
            background: p.photo ? `url(${p.photo}) center/cover no-repeat` : "#EFF6FF",
            border: p.photo ? "2px solid #E2E8F0" : "2px dashed #93C5FD",
          }}
        >
          {!p.photo && "📷"}
        </button>
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-ink">Profile photo (optional)</span>
          <div className="flex gap-2">
            <Btn small kind="ghost" onClick={() => fileRef.current?.click()}>
              {p.photo ? "Change photo" : "Upload photo"}
            </Btn>
            {p.photo && (
              <Btn small kind="danger" onClick={() => setData({ ...data, personal: { ...p, photo: "" } })}>
                Remove
              </Btn>
            )}
          </div>
          <span className="text-xs text-slate-500">JPG or PNG. A square photo works best.</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          aria-label="Upload profile photo"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadPhoto(f);
            e.target.value = "";
          }}
        />
      </div>

      <Field label="First name" value={p.firstName} onChange={set("firstName")} placeholder="Sara" />
      <Field label="Last name" value={p.lastName} onChange={set("lastName")} placeholder="Al Mahmood" />
      <Field label="Professional title" className="sm:col-span-2" value={p.title} onChange={set("title")} placeholder="Senior Graphic Designer" />
      <Field label="Email" type="email" value={p.email} onChange={set("email")} placeholder="you@email.com" />
      <Field label="Phone" value={p.phone} onChange={set("phone")} placeholder="+973 3XXX XXXX" />
      <Field label="Location" className="sm:col-span-2" value={p.location} onChange={set("location")} placeholder="Manama, Bahrain" />
      <Field label="LinkedIn" value={p.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/username" />
      <Field label="Website / portfolio" value={p.website} onChange={set("website")} placeholder="yourname.design" />
    </div>
  );
}

function SkillsStep({ data, setData }: StepProps) {
  const [skillInput, setSkillInput] = useState("");
  const [langName, setLangName] = useState("");
  const [langLevel, setLangLevel] = useState("Fluent");

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    setData({ ...data, skills: [...data.skills, s] });
    setSkillInput("");
  };
  const addLang = () => {
    const n = langName.trim();
    if (!n) return;
    setData({ ...data, languages: [...data.languages, { name: n, level: langLevel }] });
    setLangName("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 text-[13px] font-semibold text-ink">Skills</div>
        <div className="flex gap-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            placeholder="e.g. Adobe Illustrator — press Enter to add"
            className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          <Btn small onClick={addSkill}>Add</Btn>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[13px] font-semibold text-primary">
              {s}
              <button
                type="button"
                aria-label={`Remove ${s}`}
                onClick={() => setData({ ...data, skills: data.skills.filter((_, j) => j !== i) })}
                className="text-primary"
              >×</button>
            </span>
          ))}
          {data.skills.length === 0 && (
            <span className="text-[13px] text-slate-500">No skills added yet — add your strongest ones first.</span>
          )}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[13px] font-semibold text-ink">Languages</div>
        <div className="flex flex-wrap gap-2">
          <input
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLang()}
            placeholder="e.g. Arabic"
            className="min-w-[140px] flex-[2] rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          <select
            aria-label="Language proficiency level"
            value={langLevel}
            onChange={(e) => setLangLevel(e.target.value)}
            className="min-w-[110px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
          >
            {["Native", "Fluent", "Intermediate", "Basic"].map((l) => <option key={l}>{l}</option>)}
          </select>
          <Btn small onClick={addLang}>Add</Btn>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {data.languages.map((l, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-surface px-3.5 py-2">
              <span className="text-[13px]"><b>{l.name}</b> — {l.level}</span>
              <button
                type="button"
                aria-label={`Remove ${l.name}`}
                onClick={() => setData({ ...data, languages: data.languages.filter((_, j) => j !== i) })}
                className="text-[13px] text-red-600"
              >Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceStep({ data, setData }: StepProps) {
  const add = () =>
    setData({
      ...data,
      experience: [...data.experience, { company: "", role: "", location: "", start: "", end: "", current: false, bullets: "" }],
    });
  const setItem = <K extends keyof ResumeData["experience"][number]>(
    i: number, k: K, v: ResumeData["experience"][number][K]
  ) => setData({ ...data, experience: data.experience.map((e, j) => (j === i ? { ...e, [k]: v } : e)) });
  const remove = (i: number) =>
    setData({ ...data, experience: data.experience.filter((_, j) => j !== i) });

  return (
    <div className="flex flex-col gap-4">
      {data.experience.map((e, i) => (
        <Card key={i} className="bg-surface">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Job title" value={e.role} onChange={(ev) => setItem(i, "role", ev.target.value)} placeholder="Graphic Designer" />
            <Field label="Company" value={e.company} onChange={(ev) => setItem(i, "company", ev.target.value)} placeholder="Pixel & Co." />
            <Field label="Location" value={e.location} onChange={(ev) => setItem(i, "location", ev.target.value)} placeholder="Manama, Bahrain" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start" value={e.start} onChange={(ev) => setItem(i, "start", ev.target.value)} placeholder="Mar 2021" />
              <Field label="End" value={e.current ? "" : e.end} onChange={(ev) => setItem(i, "end", ev.target.value)} placeholder={e.current ? "Present" : "Feb 2024"} />
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-[13px] sm:col-span-2">
              <input type="checkbox" checked={e.current} onChange={(ev) => setItem(i, "current", ev.target.checked)} />
              I currently work here
            </label>
            <div className="sm:col-span-2">
              <Area
                label="Responsibilities & achievements"
                rows={4}
                value={e.bullets}
                onChange={(ev) => setItem(i, "bullets", ev.target.value)}
                placeholder={"One bullet per line, e.g.\nLed a rebrand that lifted engagement 60%\nManaged print production for 30+ campaigns"}
                hint="Each line becomes a bullet point. Start with an action verb."
              />
            </div>
          </div>
          <div className="mt-3 text-right">
            <Btn kind="danger" small onClick={() => remove(i)}>Remove entry</Btn>
          </div>
        </Card>
      ))}
      <Btn kind="ghost" onClick={add}>+ Add work experience</Btn>
    </div>
  );
}

function EducationStep({ data, setData }: StepProps) {
  const addEdu = () =>
    setData({ ...data, education: [...data.education, { school: "", degree: "", field: "", start: "", end: "", gpa: "" }] });
  const setEdu = (i: number, k: keyof ResumeData["education"][number], v: string) =>
    setData({ ...data, education: data.education.map((e, j) => (j === i ? { ...e, [k]: v } : e)) });
  const removeEdu = (i: number) =>
    setData({ ...data, education: data.education.filter((_, j) => j !== i) });

  const addCert = () =>
    setData({ ...data, certifications: [...data.certifications, { name: "", year: "" }] });
  const setCert = (i: number, k: "name" | "year", v: string) =>
    setData({ ...data, certifications: data.certifications.map((c, j) => (j === i ? { ...c, [k]: v } : c)) });
  const removeCert = (i: number) =>
    setData({ ...data, certifications: data.certifications.filter((_, j) => j !== i) });

  return (
    <div className="flex flex-col gap-4">
      {data.education.map((e, i) => (
        <Card key={i} className="bg-surface">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="School / university" className="sm:col-span-2" value={e.school} onChange={(ev) => setEdu(i, "school", ev.target.value)} placeholder="University of Bahrain" />
            <Field label="Degree" value={e.degree} onChange={(ev) => setEdu(i, "degree", ev.target.value)} placeholder="Bachelor of Arts" />
            <Field label="Field of study" value={e.field} onChange={(ev) => setEdu(i, "field", ev.target.value)} placeholder="Graphic Design" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start year" value={e.start} onChange={(ev) => setEdu(i, "start", ev.target.value)} placeholder="2014" />
              <Field label="End year" value={e.end} onChange={(ev) => setEdu(i, "end", ev.target.value)} placeholder="2018" />
            </div>
            <Field label="GPA (optional)" value={e.gpa} onChange={(ev) => setEdu(i, "gpa", ev.target.value)} placeholder="3.7" />
          </div>
          <div className="mt-3 text-right">
            <Btn kind="danger" small onClick={() => removeEdu(i)}>Remove entry</Btn>
          </div>
        </Card>
      ))}
      <Btn kind="ghost" onClick={addEdu}>+ Add education</Btn>

      <div className="mt-1 text-[13px] font-bold text-ink">Certifications (optional)</div>
      {data.certifications.map((c, i) => (
        <div key={i} className="flex items-end gap-2.5">
          <div className="flex-[3]">
            <Field label="Certification" value={c.name} onChange={(ev) => setCert(i, "name", ev.target.value)} placeholder="Adobe Certified Professional" />
          </div>
          <div className="flex-1">
            <Field label="Year" value={c.year} onChange={(ev) => setCert(i, "year", ev.target.value)} placeholder="2023" />
          </div>
          <Btn kind="danger" small onClick={() => removeCert(i)}>×</Btn>
        </div>
      ))}
      <Btn kind="ghost" small onClick={addCert}>+ Add certification</Btn>
    </div>
  );
}

function SubHead({ title, hint }: { title: string; hint: string }) {
  return (
    <div>
      <div className="text-[13px] font-bold text-ink">{title}</div>
      <p className="text-xs text-slate-500">{hint}</p>
    </div>
  );
}

function ProjectsEditor({ data, setData }: StepProps) {
  const projects = data.projects ?? [];
  const addProject = () =>
    setData({ ...data, projects: [...projects, { name: "", description: "", link: "" }] });
  const setProject = (i: number, k: "name" | "description" | "link", v: string) =>
    setData({ ...data, projects: projects.map((p, j) => (j === i ? { ...p, [k]: v } : p)) });
  const removeProject = (i: number) =>
    setData({ ...data, projects: projects.filter((_, j) => j !== i) });

  return (
    <div className="flex flex-col gap-3">
      <SubHead title="Projects" hint='Portfolio pieces, GitHub repos, research, campaigns — shown as "Projects" / "Selected Work".' />
      {projects.map((pr, i) => (
        <Card key={i} className="bg-surface">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Project name" value={pr.name} onChange={(e) => setProject(i, "name", e.target.value)} placeholder="Coffee brand rebrand" />
            <Field label="Link (optional)" value={pr.link} onChange={(e) => setProject(i, "link", e.target.value)} placeholder="github.com/you/repo" />
            <div className="sm:col-span-2">
              <Area
                label="Short description"
                rows={2}
                value={pr.description}
                onChange={(e) => setProject(i, "description", e.target.value)}
                placeholder="One or two lines on what it is and the result."
              />
            </div>
          </div>
          <div className="mt-3 text-right">
            <Btn kind="danger" small onClick={() => removeProject(i)}>Remove project</Btn>
          </div>
        </Card>
      ))}
      <Btn kind="ghost" small onClick={addProject}>+ Add project</Btn>
    </div>
  );
}

function AwardsEditor({ data, setData }: StepProps) {
  const awards = data.awards ?? [];
  const addAward = () =>
    setData({ ...data, awards: [...awards, { name: "", issuer: "", year: "" }] });
  const setAward = (i: number, k: "name" | "issuer" | "year", v: string) =>
    setData({ ...data, awards: awards.map((a, j) => (j === i ? { ...a, [k]: v } : a)) });
  const removeAward = (i: number) =>
    setData({ ...data, awards: awards.filter((_, j) => j !== i) });

  return (
    <div className="flex flex-col gap-3">
      <SubHead title="Awards" hint="Honors and prizes — recognition worth showing off." />
      {awards.map((a, i) => (
        <div key={i} className="flex items-end gap-2.5">
          <div className="flex-[3]">
            <Field label="Award" value={a.name} onChange={(e) => setAward(i, "name", e.target.value)} placeholder="Best Brand Identity" />
          </div>
          <div className="flex-[2]">
            <Field label="Issuer (optional)" value={a.issuer} onChange={(e) => setAward(i, "issuer", e.target.value)} placeholder="Gulf Design Council" />
          </div>
          <div className="flex-1">
            <Field label="Year" value={a.year} onChange={(e) => setAward(i, "year", e.target.value)} placeholder="2023" />
          </div>
          <Btn kind="danger" small aria-label="Remove award" onClick={() => removeAward(i)}>×</Btn>
        </div>
      ))}
      <Btn kind="ghost" small onClick={addAward}>+ Add award</Btn>
    </div>
  );
}

function ReferencesEditor({ data, setData }: StepProps) {
  const refs = data.references ?? [];
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const update = (list: NonNullable<ResumeData["references"]>) =>
    setData({ ...data, references: list });
  const setRef = (i: number, k: keyof NonNullable<ResumeData["references"]>[number], v: string) =>
    update(refs.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const add = () =>
    update([...refs, { name: "", position: "", company: "", email: "", phone: "", relationship: "", address: "" }]);
  const remove = (i: number) => update(refs.filter((_, j) => j !== i));
  const move = (from: number, to: number) => {
    if (to < 0 || to >= refs.length || from === to) return;
    const list = [...refs];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    update(list);
  };

  return (
    <div className="flex flex-col gap-3">
      <SubHead title="References" hint="Drag the ⠿ handle (or use ↑ ↓) to reorder. Add as many as you need." />
      {refs.map((r, i) => (
        <Card
          key={i}
          className={`bg-surface transition ${dragIdx === i ? "opacity-50" : ""}`}
          onDragOver={(e: React.DragEvent) => e.preventDefault()}
          onDrop={() => {
            if (dragIdx !== null) move(dragIdx, i);
            setDragIdx(null);
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span
              draggable
              onDragStart={() => setDragIdx(i)}
              onDragEnd={() => setDragIdx(null)}
              title="Drag to reorder"
              className="cursor-grab select-none rounded px-1.5 py-0.5 text-[15px] text-slate-400 hover:bg-slate-200 active:cursor-grabbing"
            >⠿</span>
            <div className="flex items-center gap-1">
              <Btn kind="ghost" small aria-label="Move up" disabled={i === 0} onClick={() => move(i, i - 1)}>↑</Btn>
              <Btn kind="ghost" small aria-label="Move down" disabled={i === refs.length - 1} onClick={() => move(i, i + 1)}>↓</Btn>
              <Btn kind="danger" small onClick={() => remove(i)}>Remove</Btn>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Full name" value={r.name} onChange={(e) => setRef(i, "name", e.target.value)} placeholder="Ahmed Al Khalifa" />
            <Field label="Position" value={r.position} onChange={(e) => setRef(i, "position", e.target.value)} placeholder="Creative Director" />
            <Field label="Company" value={r.company} onChange={(e) => setRef(i, "company", e.target.value)} placeholder="Pixel & Co. Agency" />
            <Field label="Relationship" value={r.relationship} onChange={(e) => setRef(i, "relationship", e.target.value)} placeholder="Former manager" />
            <Field label="Email" type="email" value={r.email} onChange={(e) => setRef(i, "email", e.target.value)} placeholder="ahmed@pixelco.com" />
            <Field label="Phone" value={r.phone} onChange={(e) => setRef(i, "phone", e.target.value)} placeholder="+973 3XXX XXXX" />
            <Field label="Address (optional)" className="sm:col-span-2" value={r.address} onChange={(e) => setRef(i, "address", e.target.value)} placeholder="Manama, Bahrain" />
          </div>
        </Card>
      ))}
      <Btn kind="ghost" small onClick={add}>+ Add reference</Btn>
    </div>
  );
}

function VolunteerEditor({ data, setData }: StepProps) {
  const items = data.volunteer ?? [];
  const set = (i: number, k: keyof NonNullable<ResumeData["volunteer"]>[number], v: string) =>
    setData({ ...data, volunteer: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  return (
    <div className="flex flex-col gap-3">
      <SubHead title="Volunteer experience" hint="Community work, NGOs, pro-bono projects." />
      {items.map((v, i) => (
        <Card key={i} className="bg-surface">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Role" value={v.role} onChange={(e) => set(i, "role", e.target.value)} placeholder="Design volunteer" />
            <Field label="Organization" value={v.organization} onChange={(e) => set(i, "organization", e.target.value)} placeholder="Red Crescent" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start" value={v.start} onChange={(e) => set(i, "start", e.target.value)} placeholder="2022" />
              <Field label="End" value={v.end} onChange={(e) => set(i, "end", e.target.value)} placeholder="Present" />
            </div>
            <div className="sm:col-span-2">
              <Area label="What you did" rows={2} value={v.description} onChange={(e) => set(i, "description", e.target.value)} placeholder="One bullet per line." />
            </div>
          </div>
          <div className="mt-3 text-right">
            <Btn kind="danger" small onClick={() => setData({ ...data, volunteer: items.filter((_, j) => j !== i) })}>Remove</Btn>
          </div>
        </Card>
      ))}
      <Btn kind="ghost" small onClick={() => setData({ ...data, volunteer: [...items, { organization: "", role: "", start: "", end: "", description: "" }] })}>
        + Add volunteer experience
      </Btn>
    </div>
  );
}

function PublicationsEditor({ data, setData }: StepProps) {
  const items = data.publications ?? [];
  const set = (i: number, k: keyof NonNullable<ResumeData["publications"]>[number], v: string) =>
    setData({ ...data, publications: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  return (
    <div className="flex flex-col gap-3">
      <SubHead title="Publications" hint="Articles, papers, books, talks." />
      {items.map((p, i) => (
        <div key={i} className="flex items-end gap-2.5">
          <div className="flex-[3]">
            <Field label="Title" value={p.title} onChange={(e) => set(i, "title", e.target.value)} placeholder="Designing for Trust" />
          </div>
          <div className="flex-[2]">
            <Field label="Publisher / venue" value={p.publisher} onChange={(e) => set(i, "publisher", e.target.value)} placeholder="UX Magazine" />
          </div>
          <div className="w-20">
            <Field label="Year" value={p.year} onChange={(e) => set(i, "year", e.target.value)} placeholder="2024" />
          </div>
          <div className="flex-[2]">
            <Field label="Link (optional)" value={p.link} onChange={(e) => set(i, "link", e.target.value)} placeholder="doi.org/…" />
          </div>
          <Btn kind="danger" small aria-label="Remove publication" onClick={() => setData({ ...data, publications: items.filter((_, j) => j !== i) })}>×</Btn>
        </div>
      ))}
      <Btn kind="ghost" small onClick={() => setData({ ...data, publications: [...items, { title: "", publisher: "", year: "", link: "" }] })}>
        + Add publication
      </Btn>
    </div>
  );
}

function MembershipsEditor({ data, setData }: StepProps) {
  const items = data.memberships ?? [];
  const set = (i: number, k: keyof NonNullable<ResumeData["memberships"]>[number], v: string) =>
    setData({ ...data, memberships: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  return (
    <div className="flex flex-col gap-3">
      <SubHead title="Professional memberships" hint="Associations, societies, chambers, boards." />
      {items.map((m, i) => (
        <div key={i} className="flex items-end gap-2.5">
          <div className="flex-[3]">
            <Field label="Organization" value={m.organization} onChange={(e) => set(i, "organization", e.target.value)} placeholder="Bahrain Society of Graphic Designers" />
          </div>
          <div className="flex-[2]">
            <Field label="Role (optional)" value={m.role} onChange={(e) => set(i, "role", e.target.value)} placeholder="Member" />
          </div>
          <div className="w-24">
            <Field label="Since" value={m.year} onChange={(e) => set(i, "year", e.target.value)} placeholder="2020" />
          </div>
          <Btn kind="danger" small aria-label="Remove membership" onClick={() => setData({ ...data, memberships: items.filter((_, j) => j !== i) })}>×</Btn>
        </div>
      ))}
      <Btn kind="ghost" small onClick={() => setData({ ...data, memberships: [...items, { organization: "", role: "", year: "" }] })}>
        + Add membership
      </Btn>
    </div>
  );
}

function InterestsEditor({ data, setData }: StepProps) {
  const [input, setInput] = useState("");
  const interests = data.interests ?? [];
  const add = () => {
    const s = input.trim();
    if (!s) return;
    setData({ ...data, interests: [...interests, s] });
    setInput("");
  };
  return (
    <div className="flex flex-col gap-2">
      <SubHead title="Hobbies & interests" hint="A short personal touch — keep it to a handful." />
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="e.g. Landscape photography — press Enter to add"
          className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <Btn small onClick={add}>Add</Btn>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[13px] font-semibold text-primary">
            {s}
            <button
              type="button"
              aria-label={`Remove ${s}`}
              onClick={() => setData({ ...data, interests: interests.filter((_, j) => j !== i) })}
              className="text-primary"
            >×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

function CustomEditor({ data, setData }: StepProps) {
  const items = data.custom ?? [];
  const set = (i: number, k: keyof NonNullable<ResumeData["custom"]>[number], v: string) =>
    setData({ ...data, custom: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  return (
    <div className="flex flex-col gap-3">
      <SubHead title="Custom sections" hint="Anything else — security clearances, availability, driving licence…" />
      {items.map((c, i) => (
        <Card key={i} className="bg-surface">
          <Field label="Section title" value={c.title} onChange={(e) => set(i, "title", e.target.value)} placeholder="Additional Information" />
          <div className="mt-3">
            <Area label="Content" rows={3} value={c.content} onChange={(e) => set(i, "content", e.target.value)} placeholder="One bullet per line." />
          </div>
          <div className="mt-3 text-right">
            <Btn kind="danger" small onClick={() => setData({ ...data, custom: items.filter((_, j) => j !== i) })}>Remove section</Btn>
          </div>
        </Card>
      ))}
      <Btn kind="ghost" small onClick={() => setData({ ...data, custom: [...items, { title: "", content: "" }] })}>
        + Add custom section
      </Btn>
    </div>
  );
}

function ExtrasStep({
  data, setData, sections,
}: StepProps & { sections: SectionVisibility }) {
  const hidden = SECTION_TOGGLES
    .filter((t) => !t.core && sections[t.key] === false)
    .map((t) => t.label);

  return (
    <div className="flex flex-col gap-7">
      {sections.projects !== false && <ProjectsEditor data={data} setData={setData} />}
      {sections.awards !== false && <AwardsEditor data={data} setData={setData} />}
      {sections.references !== false && <ReferencesEditor data={data} setData={setData} />}
      {sections.volunteer !== false && <VolunteerEditor data={data} setData={setData} />}
      {sections.publications !== false && <PublicationsEditor data={data} setData={setData} />}
      {sections.memberships !== false && <MembershipsEditor data={data} setData={setData} />}
      {sections.interests !== false && <InterestsEditor data={data} setData={setData} />}
      {sections.custom !== false && <CustomEditor data={data} setData={setData} />}
      {hidden.length > 0 && (
        <p className="text-xs text-slate-400">
          Disabled sections (turn on in the Finish step): {hidden.join(", ")}
        </p>
      )}
    </div>
  );
}

function FinishStep({
  sections, setSections, onPrint,
}: {
  sections: SectionVisibility;
  setSections: (s: SectionVisibility) => void;
  onPrint: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-1 text-[13px] font-bold text-ink">Manage sections</div>
        <p className="mb-2.5 text-xs text-slate-500">
          Optional sections also hide automatically while they have no entries.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SECTION_TOGGLES.map(({ key, label }) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-[13px] font-semibold transition ${
                sections[key]
                  ? "border-blue-200 bg-blue-50 text-primary"
                  : "border-slate-200 bg-surface text-slate-500"
              }`}
            >
              <input
                type="checkbox"
                checked={sections[key]}
                onChange={(e) => setSections({ ...sections, [key]: e.target.checked })}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-emerald-50 p-5">
        <div className="mb-1 text-[15px] font-bold text-navy">Your resume is ready 🎉</div>
        <p className="mb-3.5 text-[13px] text-slate-500">
          Try switching templates and accent colors in the preview toolbar — your data stays intact.
          Then export as PDF (choose &quot;Save as PDF&quot; in the print dialog).
        </p>
        <Btn kind="accent" onClick={onPrint}>Download PDF</Btn>
      </div>
    </div>
  );
}
