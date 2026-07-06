import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Dentist — soft modern lines: centered header over a thin accent rule,
   underlined headings, gentle spacing. ATS-safe single column. */
export default function DentistTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="underline">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[60px] py-12 leading-[1.6]`} style={{ fontFamily: font }}>
      <div className="text-center">
        <h1 className="text-[27px] font-bold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-1 text-[13.5px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
        <div className="mx-auto mt-4 h-0.5 w-20" style={{ background: accent }} />
      </div>

      {sections.summary && data.summary && (
        <><H>Professional Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" title="Licenses & Certifications" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Clinical Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education & Training" />
      <SkillsSection resume={resume} H={H} variant="pills" title="Clinical Skills" />
      <div className="grid grid-cols-2 gap-8">
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div><AwardsSection resume={resume} H={H} title="Professional Memberships" /></div>
      </div>
      <ProjectsSection resume={resume} H={H} />
    </div>
  );
}
