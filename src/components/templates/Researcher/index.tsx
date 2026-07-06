import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Researcher — research-first CV: hairline divider headings, publications
   and conferences immediately after research interests. */
export default function ResearcherTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="divider">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[60px] py-12 leading-[1.6]`} style={{ fontFamily: font }}>
      <div className="text-center">
        <h1 className="text-[27px] font-bold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-1 text-[13px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Research Interests</H><p className="m-0">{data.summary}</p></>
      )}
      <ProjectsSection resume={resume} H={H} title="Publications & Conference Presentations" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Research Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <AwardsSection resume={resume} H={H} title="Grants, Awards & Memberships" />
      <div className="grid grid-cols-2 gap-8">
        <div><SkillsSection resume={resume} H={H} variant="tags" title="Methods & Tools" /></div>
        <div>
          <CertificationsSection resume={resume} H={H} variant="inline" />
          <LanguagesSection resume={resume} H={H} variant="rows" />
        </div>
      </div>
    </div>
  );
}
