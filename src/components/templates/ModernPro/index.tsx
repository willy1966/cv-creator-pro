import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  HeadingComponent,
} from "../shared";

/* Modern Professional — two-column header (identity left, contact right),
   single-column ATS-safe body, blue-leaning accent usage. */
export default function ModernProTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="rule">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      {/* two-column header */}
      <div className="grid grid-cols-[1fr_auto] items-end gap-6 border-b-[3px] pb-4" style={{ borderColor: accent }}>
        <div>
          <div className={tk.name}>{fullName(p)}</div>
          <div className="mt-1 text-[15px] font-semibold" style={{ color: accent }}>{p.title}</div>
        </div>
        <div className="text-right text-[11.5px] leading-[1.7] text-slate-600">
          {[p.email, p.phone, p.location].filter(Boolean).map((c, i) => <div key={i}>{c}</div>)}
          {[p.linkedin, p.website].filter(Boolean).map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>

      {/* single-column, ATS-parseable body */}
      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
      <ProjectsSection resume={resume} H={H} />
      <EducationSection resume={resume} H={H} variant="modern" />
      <SkillsSection resume={resume} H={H} variant="pills" />
      <div className="grid grid-cols-2 gap-7">
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div>
          <CertificationsSection resume={resume} H={H} variant="inline" />
          <AwardsSection resume={resume} H={H} />
        </div>
      </div>
    </div>
  );
}
