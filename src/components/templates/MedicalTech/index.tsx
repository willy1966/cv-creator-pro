import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Medical Technician — compact and technical: tight type scale, tag skills
   and certifications immediately after the summary. ATS-safe single column. */
export default function MedicalTechTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-1.5 mt-4 flex items-center gap-2 text-[12.5px] font-extrabold uppercase tracking-[1.5px] text-slate-900">
      <span className="h-2 w-2 rounded-sm" style={{ background: accent }} />
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} px-12 py-10 text-[11.5px] leading-[1.5]`} style={{ fontFamily: font }}>
      <div className="border-b-2 pb-3.5" style={{ borderColor: accent }}>
        <h1 className="text-[24px] font-extrabold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-0.5 text-[13px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1 text-[10.5px] text-slate-600">{contactBits(p).join("  |  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" title="Licenses & Certifications" />
      <SkillsSection resume={resume} H={H} variant="tags" title="Technical Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Clinical Experience" />
      <EducationSection resume={resume} H={H} variant="compact" title="Education" />
      <div className="grid grid-cols-2 gap-7">
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div><AwardsSection resume={resume} H={H} title="Memberships" /></div>
      </div>
      <ProjectsSection resume={resume} H={H} />
    </div>
  );
}
