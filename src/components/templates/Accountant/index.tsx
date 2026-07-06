import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Accountant — ledger-clean precision: double-rule header, small-caps
   headings over hairlines, credentials directly after the summary. */
export default function AccountantTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="caps">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <div className="border-y-[3px] border-double border-slate-800 py-4">
        <h1 className="text-[26px] font-bold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-0.5 text-[13.5px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11px] text-slate-600">{contactBits(p).join("  |  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Professional Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certifications & Licenses" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Core Competencies</H><div>{data.skills.join(", ")}</div></>
      )}
      <div className="grid grid-cols-2 gap-8">
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div><AwardsSection resume={resume} H={H} title="Memberships & Honors" /></div>
      </div>
      <ProjectsSection resume={resume} H={H} title="Key Engagements" />
    </div>
  );
}
