import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Nurse — warm and approachable: soft tinted header strip, accent left-border
   headings, credentials directly under the profile. ATS-safe single column. */
export default function NurseTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-2 mt-5 border-l-4 pl-3 text-[13px] font-extrabold uppercase tracking-[1.5px] text-slate-900" style={{ borderColor: accent }}>
      {children}
    </h2>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      <div className="px-14 py-9" style={{ background: tint.soft(accent) }}>
        <h1 className={tk.name}>{fullName(p)}</h1>
        <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
      </div>

      <div className="px-14 pb-12 pt-1">
        {sections.summary && data.summary && (
          <><H>Professional Summary</H><p className="m-0">{data.summary}</p></>
        )}
        <CertificationsSection resume={resume} H={H} variant="inline" title="Licenses & Certifications" />
        <ExperienceSection resume={resume} H={H} variant="modern" title="Clinical Experience" />
        <EducationSection resume={resume} H={H} variant="modern" title="Education" />
        <SkillsSection resume={resume} H={H} variant="pills" title="Clinical Skills" />
        <div className="grid grid-cols-2 gap-8">
          <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
          <div><AwardsSection resume={resume} H={H} title="Memberships & Honors" /></div>
        </div>
        <ProjectsSection resume={resume} H={H} />
      </div>
    </div>
  );
}
