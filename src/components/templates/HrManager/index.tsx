import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* HR Manager — warm polish: centered header with a soft tinted divider,
   hairline divider headings, people-focused section labels. */
export default function HrManagerTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="divider">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12 leading-[1.6]`} style={{ fontFamily: font }}>
      <div className="text-center">
        <h1 className={tk.name}>{fullName(p)}</h1>
        <div className="mt-1 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full" style={{ background: tint.line(accent) }} />
      </div>

      {sections.summary && data.summary && (
        <><H>Profile</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="modern" title="HR & People Experience" />
      <SkillsSection resume={resume} H={H} variant="pills" title="HR Competencies" />
      <ProjectsSection resume={resume} H={H} title="Programs & Initiatives" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <div className="grid grid-cols-2 gap-8">
        <div><CertificationsSection resume={resume} H={H} variant="inline" title="Certifications" /></div>
        <div>
          <LanguagesSection resume={resume} H={H} variant="rows" />
          <AwardsSection resume={resume} H={H} title="Memberships & Recognition" />
        </div>
      </div>
    </div>
  );
}
