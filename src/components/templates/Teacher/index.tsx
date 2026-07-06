import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Teacher — warm and organized: tinted rounded header card, accent-dot
   headings, teaching experience leads. ATS-safe single column. */
export default function TeacherTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-2 mt-5 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[1.5px] text-slate-900">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} p-12`} style={{ fontFamily: font }}>
      <div className="rounded-2xl px-8 py-7" style={{ background: tint.soft(accent) }}>
        <h1 className={tk.name}>{fullName(p)}</h1>
        <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11.5px] text-slate-600">{contactBits(p).join("  ·  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Teaching Philosophy</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="modern" title="Teaching Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certifications & Licenses" />
      <SkillsSection resume={resume} H={H} variant="pills" title="Classroom Skills" />
      <ProjectsSection resume={resume} H={H} title="Programs & Projects" />
      <div className="grid grid-cols-2 gap-8">
        <div><AwardsSection resume={resume} H={H} title="Awards & Recognition" /></div>
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
      </div>
    </div>
  );
}
