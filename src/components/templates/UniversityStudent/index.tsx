import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* University Student — friendly tinted accent band header with optional
   photo, rounded heading chips, projects right after education. Body stays
   one column for ATS safety. */
export default function UniversityStudentTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2
      className="mb-2.5 mt-5 inline-block rounded-full px-3.5 py-1 text-[12px] font-extrabold uppercase tracking-[1.5px]"
      style={{ background: tint.soft(accent), color: accent }}
    >{children}</h2>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      {/* tinted band header */}
      <div className="flex items-center gap-5 px-14 py-9" style={{ background: tint.soft(accent) }}>
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="h-[84px] w-[84px] shrink-0 rounded-full border-[3px] border-white object-cover" />
        )}
        <div>
          <h1 className="text-[27px] font-extrabold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
          <div className="mt-0.5 text-[14px] font-bold" style={{ color: accent }}>{p.title}</div>
          <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
        </div>
      </div>

      <div className="px-14 pb-12 pt-1">
        {sections.summary && data.summary && (
          <><div><H>About Me</H></div><p className="m-0">{data.summary}</p></>
        )}
        <div><EducationSection resume={resume} H={H} variant="modern" title="Education" /></div>
        <div><ProjectsSection resume={resume} H={H} title="Projects" /></div>
        <div><SkillsSection resume={resume} H={H} variant="pills" title="Skills" /></div>
        <div><ExperienceSection resume={resume} H={H} variant="modern" title="Experience & Activities" /></div>
        <div><CertificationsSection resume={resume} H={H} variant="inline" title="Certificates" /></div>
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div><AwardsSection resume={resume} H={H} /></div>
      </div>
    </div>
  );
}
