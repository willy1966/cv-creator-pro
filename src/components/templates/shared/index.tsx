/* Shared building blocks used by every resume template.
 *
 * Templates own LAYOUT (columns, sidebars, header bands); these components
 * own the repeated CONTENT markup, so section rendering logic lives in
 * exactly one place. Styling is Tailwind-only; the user's accent color and
 * font are the only inline style values (they are runtime-dynamic).
 */
import type { ReactNode, ComponentType } from "react";
import { splitBullets, fullName, dateRange, ResumeData } from "@/lib/types";
import type { Resume } from "../types";
import { tk, tint } from "../tokens";

export type HeadingComponent = ComponentType<{ children: ReactNode }>;

interface SectionProps {
  resume: Resume;
  H: HeadingComponent;
  title?: string;
}

/* ---------- helpers (single home for these — no duplication) ---------- */

export function contactBits(p: ResumeData["personal"]): string[] {
  return [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);
}

/* ---------- SectionHeading ---------- */

export function SectionHeading({
  children, accent, variant,
}: {
  children: ReactNode;
  accent: string;
  variant:
    | "rule" | "underline" | "bar" | "center" | "serif"
    | "boxed" | "goldserif" | "spaced" | "divider" | "caps";
}) {
  switch (variant) {
    case "caps": // plain small-caps over a hairline — the ATS-safe workhorse
      return (
        <h2 className="mb-2 mt-5 border-b border-slate-300 pb-1 text-[13px] font-bold uppercase tracking-[2px] text-slate-900">
          {children}
        </h2>
      );
    case "rule": // accent label + hairline (Modern)
      return (
        <div className="mb-2.5 mt-5 flex items-center gap-2.5">
          <span className={tk.headingText} style={{ color: accent }}>{children}</span>
          <span className="h-0.5 flex-1 rounded-sm" style={{ background: tint.line(accent) }} />
        </div>
      );
    case "underline": // dark label, accent underline (Sidebar main column)
      return (
        <div
          className={`${tk.headingText} mb-3 mt-5 border-b-2 pb-1 text-slate-900`}
          style={{ borderColor: accent }}
        >{children}</div>
      );
    case "bar": // small accent bar + label (Executive)
      return (
        <div className="mb-2.5 mt-5 flex items-center gap-2.5">
          <span className="h-[3px] w-[18px]" style={{ background: accent }} />
          <span className={`${tk.headingText} tracking-[2.5px] text-slate-900`}>{children}</span>
        </div>
      );
    case "center": // centered label + accent tick (Minimal)
      return (
        <div className="mb-3 mt-6 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[4px] text-slate-800">{children}</span>
          <div className="mx-auto mt-1.5 h-0.5 w-7" style={{ background: accent }} />
        </div>
      );
    case "serif": // full-width rule, serif (Classic)
      return (
        <div className="mb-2.5 mt-5 border-b-[1.5px] border-slate-800 pb-1 text-[14px] font-bold uppercase tracking-wider text-slate-800">
          {children}
        </div>
      );
    case "boxed": // full-width tinted band (Corporate)
      return (
        <div className="mb-2.5 mt-5 bg-slate-100 px-3 py-1.5 text-[12.5px] font-bold uppercase tracking-[1.5px] text-slate-800">
          {children}
        </div>
      );
    case "goldserif": // serif small caps over a thin accent rule (Executive Gold)
      return (
        <div className="mb-3 mt-6">
          <div
            className="text-[14px] font-semibold uppercase tracking-[3px] text-slate-800"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >{children}</div>
          <div className="mt-1 h-px w-full" style={{ background: accent }} />
        </div>
      );
    case "spaced": // tiny widely-tracked label, lots of air (Minimal Mono)
      return (
        <div className="mb-4 mt-9 text-[10.5px] font-bold uppercase tracking-[5px] text-slate-400">
          {children}
        </div>
      );
    case "divider": // centered label between hairlines (Elegant)
      return (
        <div className="mb-3 mt-6 flex items-center gap-3.5">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[11.5px] font-semibold uppercase tracking-[3.5px] text-slate-500">{children}</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      );
  }
}

/* ---------- ResumeHeader ---------- */

export function ResumeHeader({
  resume, variant,
}: {
  resume: Resume;
  variant: "rail" | "center" | "classic" | "band";
}) {
  const { accent } = resume;
  const p = resume.data.personal;
  const bits = contactBits(p);
  const photo = (cls: string, border: string) =>
    p.photo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={p.photo} alt="" className={`shrink-0 rounded-full object-cover ${cls}`} style={{ borderColor: border }} />
    ) : null;

  if (variant === "rail")
    return (
      <div className="flex items-center gap-5">
        <div className="flex-1 border-l-[5px] pl-5" style={{ borderColor: accent }}>
          <div className={tk.name}>{fullName(p)}</div>
          <div className="mt-0.5 text-[15px] font-semibold" style={{ color: accent }}>{p.title}</div>
          <div className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[11.5px] text-slate-600">
            {bits.map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
        {photo("h-[92px] w-[92px] border-[3px]", accent)}
      </div>
    );

  if (variant === "center")
    return (
      <div className="text-center">
        <div className="flex justify-center">{photo("mb-3.5 h-[88px] w-[88px] border-2", accent)}</div>
        <div className="text-[30px] font-light uppercase tracking-[6px] leading-tight">{fullName(p)}</div>
        <div className="mt-1.5 text-[13px] uppercase tracking-[3px]" style={{ color: accent }}>{p.title}</div>
        <div className={`mt-2.5 ${tk.meta}`}>{bits.join("   ·   ")}</div>
      </div>
    );

  if (variant === "classic")
    return (
      <div className="border-b-[3px] border-double border-slate-800 pb-3.5 text-center">
        <div className="flex justify-center">{photo("mb-2.5 h-[84px] w-[84px] border-2", "#1E293B")}</div>
        <div className="text-[28px] font-bold leading-tight">{fullName(p)}</div>
        <div className="mt-0.5 text-[13px] italic" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11px]">{bits.join("  |  ")}</div>
      </div>
    );

  /* band */
  return (
    <div className="flex items-center gap-6 bg-slate-900 px-[52px] py-10 text-white">
      <div className="flex-1">
        <div className="text-[30px] font-extrabold uppercase tracking-wide leading-tight">{fullName(p)}</div>
        <div className="mt-1 text-[14px] font-semibold uppercase tracking-[1.5px]" style={{ color: accent }}>{p.title}</div>
        <div className="mt-3 flex flex-wrap gap-x-[18px] gap-y-1 text-[11px] text-slate-300">
          {bits.map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>
      {photo("h-[100px] w-[100px] border-[3px]", accent)}
    </div>
  );
}

/* ---------- ExperienceSection ---------- */

export function ExperienceSection({
  resume, H, title = "Experience", variant = "modern",
}: SectionProps & { variant?: "modern" | "classic" | "railed" | "plain" }) {
  const { accent, sections, data } = resume;
  if (!sections.experience || data.experience.length === 0) return null;
  return (
    <>
      <H>{title}</H>
      {data.experience.map((e, i) => (
        <div
          key={i}
          className={variant === "railed" ? "mb-3.5 border-l-2 pl-3.5" : "mb-3.5"}
          style={variant === "railed" ? { borderColor: tint.line(accent) } : undefined}
        >
          {variant === "classic" ? (
            <>
              <div className="flex items-baseline justify-between">
                <span className="font-bold">{e.company}{e.location ? `, ${e.location}` : ""}</span>
                <span className="text-[11px]">{dateRange(e)}</span>
              </div>
              <div className="text-[12px] italic">{e.role}</div>
            </>
          ) : (
            <>
              <div className="flex items-baseline justify-between">
                <span className={tk.itemTitle}>
                  {variant === "plain" ? `${e.role}${e.company ? ` — ${e.company}` : ""}` : e.role}
                </span>
                <span className={tk.meta}>{dateRange(e)}</span>
              </div>
              {variant !== "plain" && (
                <div className={tk.itemSub} style={{ color: variant === "modern" ? accent : undefined }}>
                  {e.company}{e.location ? ` · ${e.location}` : ""}
                </div>
              )}
            </>
          )}
          <ul className={tk.bullets}>
            {splitBullets(e.bullets).map((b, j) => <li key={j} className={tk.bullet}>{b}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ---------- EducationSection ---------- */

export function EducationSection({
  resume, H, title = "Education", variant = "modern",
}: SectionProps & { variant?: "modern" | "classic" | "center" | "compact" }) {
  const { sections, data } = resume;
  if (!sections.education || data.education.length === 0) return null;
  return (
    <>
      <H>{title}</H>
      {data.education.map((e, i) => {
        const degree = `${e.degree}${e.field ? `, ${e.field}` : ""}`;
        const years = `${e.start} — ${e.end}`;
        if (variant === "classic")
          return (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{e.school}</span>
                <span className="text-[11px]">{years}</span>
              </div>
              <div className="text-[12px] italic">{degree}{e.gpa ? ` — GPA ${e.gpa}` : ""}</div>
            </div>
          );
        if (variant === "center")
          return (
            <div key={i} className="mb-2 text-center">
              <span className="font-bold">{degree}</span>
              <div className={`${tk.small} ${tk.muted}`}>{e.school} · {years}{e.gpa ? ` · GPA ${e.gpa}` : ""}</div>
            </div>
          );
        if (variant === "compact")
          return (
            <div key={i} className="mb-2">
              <div className="font-bold">{degree}</div>
              <div className={`${tk.small} ${tk.muted}`}>{e.school} · {years}</div>
            </div>
          );
        return (
          <div key={i} className="mb-2.5">
            <div className="flex justify-between">
              <span className="font-bold">{degree}</span>
              <span className={tk.meta}>{years}</span>
            </div>
            <div className="text-[12px] text-slate-600">{e.school}{e.gpa ? ` · GPA ${e.gpa}` : ""}</div>
          </div>
        );
      })}
    </>
  );
}

/* ---------- SkillsSection ---------- */

export function SkillsSection({
  resume, H, title = "Skills", variant = "pills",
}: SectionProps & { variant?: "pills" | "tags" | "dots" | "inline" }) {
  const { accent, sections, data } = resume;
  if (!sections.skills || data.skills.length === 0) return null;
  return (
    <>
      <H>{title}</H>
      {variant === "inline" ? (
        <div className="text-center text-slate-700">{data.skills.join("   ·   ")}</div>
      ) : variant === "dots" ? (
        data.skills.map((s, i) => (
          <div key={i} className="mb-1.5 flex items-center gap-2 text-[11.5px]">
            <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: accent }} />{s}
          </div>
        ))
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((s, i) =>
            variant === "tags" ? (
              <span key={i} className="rounded border px-2.5 py-[3px] text-[11px] font-semibold text-slate-900" style={{ borderColor: tint.border(accent) }}>{s}</span>
            ) : (
              <span key={i} className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: tint.soft(accent), color: accent }}>{s}</span>
            )
          )}
        </div>
      )}
    </>
  );
}

/* ---------- LanguagesSection ---------- */

export function LanguagesSection({
  resume, H, title = "Languages", variant = "rows",
}: SectionProps & { variant?: "rows" | "inline" | "dark" }) {
  const { sections, data } = resume;
  if (!sections.languages || data.languages.length === 0) return null;
  return (
    <>
      <H>{title}</H>
      {variant === "inline" ? (
        <div className="text-center text-slate-700">
          {data.languages.map((l) => `${l.name} (${l.level})`).join("   ·   ")}
        </div>
      ) : (
        data.languages.map((l, i) =>
          variant === "dark" ? (
            <div key={i} className="mb-1 text-[11.5px]">
              <span className="font-semibold text-white">{l.name}</span>
              <span className="text-slate-400"> — {l.level}</span>
            </div>
          ) : (
            <div key={i} className="mb-1 flex justify-between text-[12px]">
              <span className="font-semibold">{l.name}</span>
              <span className={tk.muted}>{l.level}</span>
            </div>
          )
        )
      )}
    </>
  );
}

/* ---------- CertificationsSection ---------- */

export function CertificationsSection({
  resume, H, title = "Certifications", variant = "stacked",
}: SectionProps & { variant?: "stacked" | "inline" | "center" }) {
  const { sections, data } = resume;
  if (!sections.certifications || data.certifications.length === 0) return null;
  return (
    <>
      <H>{title}</H>
      {data.certifications.map((c, i) =>
        variant === "center" ? (
          <div key={i} className="mb-1 text-center text-slate-700">{c.name} — {c.year}</div>
        ) : variant === "inline" ? (
          <div key={i} className="mb-1 text-[12px]">
            <span className="font-semibold">{c.name}</span>
            <span className={tk.muted}> · {c.year}</span>
          </div>
        ) : (
          <div key={i} className="mb-1.5 text-[12px]">
            <div className="font-semibold">{c.name}</div>
            <div className={tk.meta}>{c.year}</div>
          </div>
        )
      )}
    </>
  );
}

/* ---------- ProjectsSection (optional data) ---------- */

export function ProjectsSection({ resume, H, title = "Projects" }: SectionProps) {
  const projects = resume.data.projects ?? [];
  if (projects.length === 0) return null;
  return (
    <>
      <H>{title}</H>
      {projects.map((p, i) => (
        <div key={i} className="mb-2.5">
          <span className="font-bold">{p.name}</span>
          {p.link && <span className={`${tk.meta} ml-2`}>{p.link}</span>}
          {p.description && <div className="text-[12px] text-slate-600">{p.description}</div>}
        </div>
      ))}
    </>
  );
}

/* ---------- AwardsSection (optional data) ---------- */

export function AwardsSection({ resume, H, title = "Awards" }: SectionProps) {
  const awards = resume.data.awards ?? [];
  if (awards.length === 0) return null;
  return (
    <>
      <H>{title}</H>
      {awards.map((a, i) => (
        <div key={i} className="mb-1.5 text-[12px]">
          <span className="font-semibold">{a.name}</span>
          <span className={tk.muted}>{a.issuer ? ` · ${a.issuer}` : ""}{a.year ? ` · ${a.year}` : ""}</span>
        </div>
      ))}
    </>
  );
}

/* ---------- ResumeFooter ---------- */

export function ResumeFooter({ resume }: { resume: Resume }) {
  const p = resume.data.personal;
  const bits = contactBits(p);
  if (bits.length === 0) return null;
  return (
    <div className="mt-8 border-t border-slate-200 pt-3 text-center text-[10px] tracking-wide text-slate-400">
      {fullName(p)} · {bits.slice(0, 3).join(" · ")}
    </div>
  );
}
