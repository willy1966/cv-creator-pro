import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Lecturer — modern academic: sans body with accent rule headings, teaching
   and research balanced side by side lower down. */
export default function LecturerTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="rule">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <div className="flex items-end justify-between gap-6 border-b-2 pb-4" style={{ borderColor: accent }}>
        <div>
          <h1 className={tk.name}>{fullName(p)}</h1>
          <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        </div>
        <div className="pb-0.5 text-right text-[11px] leading-[1.7] text-slate-600">
          {contactBits(p).map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>

      {sections.summary && data.summary && (
        <><H>Profile</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="modern" title="Teaching Experience" />
      <ProjectsSection resume={resume} H={H} title="Research & Conferences" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <SkillsSection resume={resume} H={H} variant="pills" title="Teaching Skills" />
          <LanguagesSection resume={resume} H={H} variant="rows" />
        </div>
        <div>
          <CertificationsSection resume={resume} H={H} variant="inline" />
          <AwardsSection resume={resume} H={H} title="Awards & Memberships" />
        </div>
      </div>
    </div>
  );
}
