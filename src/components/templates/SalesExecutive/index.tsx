import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Sales Executive — bold and results-first: uppercase display name on a dark
   band, underline headings, achievements surfaced high. */
export default function SalesExecutiveTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="underline">{children}</SectionHeading>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      <div className="bg-slate-900 px-14 py-9 text-white">
        <h1 className="text-[29px] font-extrabold uppercase tracking-wide leading-tight">{fullName(p)}</h1>
        <div className="mt-1 text-[13.5px] font-bold uppercase tracking-[1.5px]" style={{ color: accent }}>{p.title}</div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-300">
          {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <div className="px-14 pb-12 pt-1">
        {sections.summary && data.summary && (
          <><H>Profile</H><p className="m-0">{data.summary}</p></>
        )}
        <AwardsSection resume={resume} H={H} title="Key Achievements" />
        <ExperienceSection resume={resume} H={H} variant="modern" title="Sales Experience" />
        <SkillsSection resume={resume} H={H} variant="pills" title="Sales Skills" />
        <ProjectsSection resume={resume} H={H} title="Major Accounts & Campaigns" />
        <EducationSection resume={resume} H={H} variant="compact" title="Education" />
        <div className="grid grid-cols-2 gap-8">
          <div><CertificationsSection resume={resume} H={H} variant="inline" /></div>
          <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        </div>
      </div>
    </div>
  );
}
