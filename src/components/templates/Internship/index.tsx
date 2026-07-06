import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Internship — objective-led and compact: centered header, tight spacing,
   skills right under the objective so recruiters see fit immediately. */
export default function InternshipTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="bar">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-11 text-[12px] leading-[1.5]`} style={{ fontFamily: font }}>
      <div className="border-b-2 pb-3.5 text-center" style={{ borderColor: accent }}>
        <h1 className="text-[25px] font-extrabold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-0.5 text-[13px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1 text-[11px] text-slate-600">{contactBits(p).join("  |  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Objective</H><p className="m-0">{data.summary}</p></>
      )}
      <SkillsSection resume={resume} H={H} variant="tags" title="Skills" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <ProjectsSection resume={resume} H={H} title="Projects" />
      <ExperienceSection resume={resume} H={H} variant="plain" title="Internships" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certificates" />
      <div className="grid grid-cols-2 gap-7">
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div><AwardsSection resume={resume} H={H} /></div>
      </div>
    </div>
  );
}
