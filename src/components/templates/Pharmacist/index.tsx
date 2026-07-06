import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Pharmacist — precise and orderly: banded (boxed) section headings, split
   header with credentials called out first. ATS-safe single column. */
export default function PharmacistTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="boxed">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <div className="flex items-end justify-between gap-6 border-b-2 pb-4" style={{ borderColor: accent }}>
        <div>
          <h1 className="text-[26px] font-bold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
          <div className="mt-0.5 text-[13.5px] font-semibold text-slate-600">{p.title}</div>
        </div>
        <div className="pb-0.5 text-right text-[11px] leading-[1.7] text-slate-600">
          {contactBits(p).slice(0, 3).map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>
      {contactBits(p).length > 3 && (
        <div className="mt-1.5 text-[11px] text-slate-500">{contactBits(p).slice(3).join("  ·  ")}</div>
      )}

      {sections.summary && data.summary && (
        <><H>Professional Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" title="Licenses & Certifications" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Core Competencies</H><div>{data.skills.join(", ")}</div></>
      )}
      {sections.languages && data.languages.length > 0 && (
        <><H>Languages</H><div>{data.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</div></>
      )}
      <AwardsSection resume={resume} H={H} title="Professional Memberships" />
      <ProjectsSection resume={resume} H={H} />
    </div>
  );
}
