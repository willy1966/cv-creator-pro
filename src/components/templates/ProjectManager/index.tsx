import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Project Manager — structured and delivery-focused: light banner header,
   rule headings, delivered projects called out right after experience. */
export default function ProjectManagerTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="rule">{children}</SectionHeading>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      <div className="border-b bg-slate-50 px-14 py-9" style={{ borderColor: tint.border(accent) }}>
        <h1 className={tk.name}>{fullName(p)}</h1>
        <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-600">
          {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <div className="px-14 pb-12 pt-1">
        {sections.summary && data.summary && (
          <><H>Profile</H><p className="m-0">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
        <ProjectsSection resume={resume} H={H} title="Delivered Projects" />
        <SkillsSection resume={resume} H={H} variant="pills" title="Methodologies & Skills" />
        <EducationSection resume={resume} H={H} variant="modern" title="Education" />
        <div className="grid grid-cols-2 gap-8">
          <div><CertificationsSection resume={resume} H={H} variant="inline" title="Certifications" /></div>
          <div>
            <LanguagesSection resume={resume} H={H} variant="rows" />
            <AwardsSection resume={resume} H={H} />
          </div>
        </div>
      </div>
    </div>
  );
}
