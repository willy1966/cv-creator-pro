import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* School Administrator — leadership-toned and structured: dark header band,
   boxed section headings, initiatives (projects) framed as programs. */
export default function SchoolAdminTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="boxed">{children}</SectionHeading>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      <div className="bg-slate-900 px-14 py-9 text-white">
        <h1 className="text-[27px] font-bold tracking-tight leading-tight">{fullName(p)}</h1>
        <div className="mt-0.5 text-[13.5px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-300">
          {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <div className="px-14 pb-12 pt-1">
        {sections.summary && data.summary && (
          <><H>Leadership Profile</H><p className="m-0">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={H} variant="modern" title="Leadership & Administrative Experience" />
        <ProjectsSection resume={resume} H={H} title="Programs & Initiatives" />
        <EducationSection resume={resume} H={H} variant="modern" title="Education" />
        <CertificationsSection resume={resume} H={H} variant="inline" title="Certifications & Licenses" />
        <div className="grid grid-cols-2 gap-8">
          <div>
            {sections.skills && data.skills.length > 0 && (
              <><H>Core Competencies</H><div>{data.skills.join(", ")}</div></>
            )}
          </div>
          <div>
            <AwardsSection resume={resume} H={H} title="Awards & Memberships" />
            <LanguagesSection resume={resume} H={H} variant="rows" />
          </div>
        </div>
      </div>
    </div>
  );
}
