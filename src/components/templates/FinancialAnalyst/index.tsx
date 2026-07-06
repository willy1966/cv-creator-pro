import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Financial Analyst — sharp and confident: heavy name over an accent bar,
   right-aligned contact, bar headings, analysis-forward ordering. */
export default function FinancialAnalystTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="bar">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <div className="grid grid-cols-[1fr_auto] items-end gap-6">
        <div>
          <h1 className="text-[29px] font-extrabold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
          <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        </div>
        <div className="pb-0.5 text-right text-[11px] leading-[1.7] text-slate-600">
          {contactBits(p).map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>
      <div className="mt-3.5 h-[3px] w-full" style={{ background: accent }} />

      {sections.summary && data.summary && (
        <><H>Profile</H><p className="m-0">{data.summary}</p></>
      )}
      <SkillsSection resume={resume} H={H} variant="tags" title="Analytical Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
      <ProjectsSection resume={resume} H={H} title="Key Analyses & Projects" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <div className="grid grid-cols-2 gap-8">
        <div><CertificationsSection resume={resume} H={H} variant="inline" title="Certifications" /></div>
        <div>
          <LanguagesSection resume={resume} H={H} variant="rows" />
          <AwardsSection resume={resume} H={H} />
        </div>
      </div>
    </div>
  );
}
