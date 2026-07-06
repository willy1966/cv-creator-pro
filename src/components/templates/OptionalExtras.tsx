/* OptionalExtras — renders the flexible optional sections (references,
 * volunteer experience, publications, memberships, hobbies & interests, and
 * custom sections) beneath any template.
 *
 * It is appended after <Template/> in both the builder page and the gallery
 * preview, so all 55 templates support these sections uniformly without
 * per-template markup. Every block renders ONLY when the section is enabled
 * in Manage Sections AND contains data — empty sections leave no trace in
 * print or PDF output.
 */
import type { ReactNode } from "react";
import { splitBullets } from "@/lib/types";
import type { Resume } from "./types";

function H({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <div className="mb-2.5 mt-6 flex items-center gap-2.5">
      <span className="text-[13px] font-extrabold uppercase tracking-[2px] text-slate-900">
        {children}
      </span>
      <span className="h-px flex-1 bg-slate-200" />
      <span className="h-[3px] w-5" style={{ background: accent }} />
    </div>
  );
}

export default function OptionalExtras({ resume }: { resume: Resume }) {
  const { accent, font, data, sections } = resume;

  const on = (k: keyof typeof sections) => sections[k] !== false;
  const references = on("references") ? data.references ?? [] : [];
  const volunteer = on("volunteer") ? data.volunteer ?? [] : [];
  const publications = on("publications") ? data.publications ?? [] : [];
  const memberships = on("memberships") ? data.memberships ?? [] : [];
  const interests = on("interests") ? data.interests ?? [] : [];
  const custom = on("custom") ? (data.custom ?? []).filter((c) => c.title.trim() || c.content.trim()) : [];

  const empty =
    references.length + volunteer.length + publications.length +
    memberships.length + interests.length + custom.length === 0;
  if (empty) return null;

  return (
    <div
      className="break-words bg-white px-14 pb-12 text-[12.5px] leading-[1.55] text-slate-800"
      style={{ fontFamily: font }}
    >
      {volunteer.length > 0 && (
        <>
          <H accent={accent}>Volunteer Experience</H>
          {volunteer.map((v, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-bold">
                  {v.role}{v.organization ? ` — ${v.organization}` : ""}
                </span>
                <span className="text-[11px] text-slate-500">
                  {v.start}{v.start || v.end ? " — " : ""}{v.end}
                </span>
              </div>
              {v.description && (
                <ul className="mt-1 list-disc pl-4">
                  {splitBullets(v.description).map((b, j) => <li key={j} className="mb-0.5">{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {publications.length > 0 && (
        <>
          <H accent={accent}>Publications</H>
          {publications.map((p, i) => (
            <div key={i} className="mb-2">
              <span className="font-bold">{p.title}</span>
              <div className="text-[11.5px] text-slate-600">
                {[p.publisher, p.year].filter(Boolean).join(", ")}
                {p.link && <span className="ml-2 text-[11px] text-slate-500">{p.link}</span>}
              </div>
            </div>
          ))}
        </>
      )}

      {memberships.length > 0 && (
        <>
          <H accent={accent}>Professional Memberships</H>
          {memberships.map((m, i) => (
            <div key={i} className="mb-1.5 text-[12px]">
              <span className="font-semibold">{m.organization}</span>
              <span className="text-slate-500">
                {m.role ? ` · ${m.role}` : ""}{m.year ? ` · ${m.year}` : ""}
              </span>
            </div>
          ))}
        </>
      )}

      {custom.map((c, i) => (
        <div key={i}>
          <H accent={accent}>{c.title || "Additional Information"}</H>
          <ul className="list-disc pl-4">
            {splitBullets(c.content).map((b, j) => <li key={j} className="mb-0.5">{b}</li>)}
          </ul>
        </div>
      ))}

      {interests.length > 0 && (
        <>
          <H accent={accent}>Hobbies &amp; Interests</H>
          <div className="text-slate-700">{interests.join("  ·  ")}</div>
        </>
      )}

      {references.length > 0 && (
        <>
          <H accent={accent}>References</H>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {references.map((r, i) => (
              <div key={i}>
                <div className="text-[13px] font-bold">{r.name}</div>
                <div className="text-[12px] text-slate-600">
                  {[r.position, r.company].filter(Boolean).join(", ")}
                </div>
                {r.relationship && (
                  <div className="text-[11px] italic text-slate-500">{r.relationship}</div>
                )}
                <div className="mt-0.5 text-[11px] text-slate-600">
                  {[r.email, r.phone].filter(Boolean).join("  ·  ")}
                </div>
                {r.address && <div className="text-[11px] text-slate-500">{r.address}</div>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
