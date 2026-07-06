import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* UX/UI Portfolio — geometric header (accent square + photo card), work-first
   ordering, squared accent-bordered headings. */
export default function UxUiPortfolioTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-2.5 mt-6 flex items-center gap-2.5">
      <span className="h-3 w-3" style={{ background: accent }} />
      <span className="text-[12.5px] font-extrabold uppercase tracking-[2.5px] text-slate-900">{children}</span>
    </div>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      {/* geometric header */}
      <div className="flex items-center gap-7">
        <div className="flex-1">
          <div className="mb-3 h-1.5 w-16" style={{ background: accent }} />
          <h1 className="text-[34px] font-black tracking-tight leading-[1.05] text-slate-900">{fullName(p)}</h1>
          <div className="mt-1.5 text-[14px] font-bold" style={{ color: accent }}>{p.title}</div>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
            {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
        {p.photo && (
          <div className="relative shrink-0">
            <div className="absolute -left-2.5 -top-2.5 h-[120px] w-[120px]" style={{ background: tint.line(accent) }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.photo} alt="" className="relative h-[120px] w-[120px] rounded object-cover" />
          </div>
        )}
      </div>

      {sections.summary && data.summary && (
        <><H>About</H><p className="m-0 max-w-[600px]">{data.summary}</p></>
      )}
      <ProjectsSection resume={resume} H={H} title="Selected Work" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <EducationSection resume={resume} H={H} variant="compact" />
          <LanguagesSection resume={resume} H={H} variant="rows" />
        </div>
        <div>
          <SkillsSection resume={resume} H={H} variant="pills" title="Toolkit" />
          <CertificationsSection resume={resume} H={H} variant="inline" />
          <AwardsSection resume={resume} H={H} />
        </div>
      </div>
    </div>
  );
}
