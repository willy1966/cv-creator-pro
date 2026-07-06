import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Fresh Graduate — education leads, bold accent rail header, skill pills for
   energy. Single-column body keeps it ATS-parseable. */
export default function FreshGraduateTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="rule">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      {/* accent rail header */}
      <div className="border-l-[6px] pl-5" style={{ borderColor: accent }}>
        <h1 className={tk.name}>{fullName(p)}</h1>
        <div className="mt-0.5 text-[14.5px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>About Me</H><p className="m-0">{data.summary}</p></>
      )}
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <ProjectsSection resume={resume} H={H} title="Projects" />
      <SkillsSection resume={resume} H={H} variant="pills" title="Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Internships & Experience" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certificates" />
      <LanguagesSection resume={resume} H={H} variant="rows" />
      <AwardsSection resume={resume} H={H} />
    </div>
  );
}
