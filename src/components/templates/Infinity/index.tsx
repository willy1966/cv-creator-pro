import { fullName, splitBullets, dateRange } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint, PAGE } from "../tokens";
import {
  EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Infinity — a vertical accent gradient rail runs the full page height, and
   experience renders as a continuous dotted career timeline. */
export default function InfinityTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-3 mt-7 text-[13px] font-extrabold uppercase tracking-[2.5px] text-slate-900">
      {children}
    </div>
  );

  return (
    <div className={`${tk.page} grid grid-cols-[10px_1fr]`} style={{ fontFamily: font, minHeight: PAGE.minHeight }}>
      {/* gradient edge rail */}
      <div style={{ background: `linear-gradient(180deg, ${accent}, ${tint.line(accent)})` }} />

      <div className="px-14 py-12">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <h1 className="text-[32px] font-extrabold tracking-tight leading-[1.05] text-slate-900">{fullName(p)}</h1>
            <div className="mt-1 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
              {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
          {p.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.photo} alt="" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
          )}
        </div>

        {sections.summary && data.summary && (
          <><H>Profile</H><p className="m-0 leading-[1.65]">{data.summary}</p></>
        )}

        {/* career timeline */}
        {sections.experience && data.experience.length > 0 && (
          <>
            <H>Career Timeline</H>
            <div className="border-l-2 border-dotted pl-6" style={{ borderColor: tint.border(accent) }}>
              {data.experience.map((e, i) => (
                <div key={i} className="relative mb-5">
                  <span
                    className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border-2 bg-white"
                    style={{ borderColor: accent }}
                  />
                  <div className="flex items-baseline justify-between">
                    <span className={tk.itemTitle}>{e.role}</span>
                    <span className="text-[11px] font-semibold" style={{ color: accent }}>{dateRange(e)}</span>
                  </div>
                  <div className="text-[12px] font-semibold text-slate-500">
                    {e.company}{e.location ? ` · ${e.location}` : ""}
                  </div>
                  <ul className={tk.bullets}>
                    {splitBullets(e.bullets).map((b, j) => <li key={j} className={tk.bullet}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        <ProjectsSection resume={resume} H={H} title="Projects" />
        <div className="grid grid-cols-2 gap-9">
          <div>
            <EducationSection resume={resume} H={H} variant="compact" />
            <LanguagesSection resume={resume} H={H} variant="rows" />
          </div>
          <div>
            <SkillsSection resume={resume} H={H} variant="pills" />
            <CertificationsSection resume={resume} H={H} variant="inline" />
            <AwardsSection resume={resume} H={H} />
          </div>
        </div>
      </div>
    </div>
  );
}
