import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Academic — formal serif CV for research and academia: education and
   research projects lead, honors get their own prominence. */
const SERIF = "Georgia, 'Times New Roman', serif";

export default function AcademicTemplate({ resume }: TemplateProps) {
  const { accent, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="serif">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[64px] py-[52px] leading-[1.6]`} style={{ fontFamily: SERIF }}>
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-[27px] font-bold leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-0.5 text-[13px] italic text-slate-700">{p.title}</div>
        <div className="mt-1.5 text-[11px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Research Interests</H><p className="m-0">{data.summary}</p></>
      )}
      <EducationSection resume={resume} H={H} variant="classic" title="Education" />
      <ProjectsSection resume={resume} H={H} title="Research Projects" />
      <ExperienceSection resume={resume} H={H} variant="classic" title="Academic & Professional Experience" />
      <AwardsSection resume={resume} H={H} title="Honors & Awards" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certifications" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Skills</H><div>{data.skills.join(" · ")}</div></>
      )}
      <LanguagesSection resume={resume} H={H} variant="rows" />
    </div>
  );
}
