import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, CertificationsSection,
  ProjectsSection, AwardsSection, contactBits, HeadingComponent,
} from "../shared";

/* ATS Professional — single column, no photo/icons/tables/graphics.
   Bold uppercase headings with a hairline underline; standard section names
   so parsers classify content correctly. */
export default function AtsProfessionalTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="caps">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <h1 className="text-[26px] font-bold leading-tight text-slate-900">{fullName(p)}</h1>
      <div className="mt-0.5 text-[14px] font-semibold text-slate-700">{p.title}</div>
      <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  |  ")}</div>

      {sections.summary && data.summary && (
        <><H>Professional Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="plain" title="Professional Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Skills</H><div>{data.skills.join(", ")}</div></>
      )}
      {sections.languages && data.languages.length > 0 && (
        <><H>Languages</H><div>{data.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</div></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" />
      <ProjectsSection resume={resume} H={H} />
      <AwardsSection resume={resume} H={H} />
    </div>
  );
}
