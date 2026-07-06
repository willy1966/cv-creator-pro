import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Canadian Professional — no photo or personal details, a "Summary of
   Qualifications" opener, and languages surfaced early (bilingual culture). */
export default function CanadianTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="underline">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <div className="border-b-2 pb-4" style={{ borderColor: accent }}>
        <h1 className={tk.name}>{fullName(p)}</h1>
        <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Summary of Qualifications</H><p className="m-0">{data.summary}</p></>
      )}
      <div className="grid grid-cols-[1fr_200px] gap-8">
        <div><SkillsSection resume={resume} H={H} variant="pills" title="Core Skills" /></div>
        <div><LanguagesSection resume={resume} H={H} variant="rows" title="Languages" /></div>
      </div>
      <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certifications" />
      <ProjectsSection resume={resume} H={H} title="Selected Projects" />
      <AwardsSection resume={resume} H={H} title="Awards & Professional Associations" />
    </div>
  );
}
