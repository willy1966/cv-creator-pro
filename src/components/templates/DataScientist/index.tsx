import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Data Scientist — analytical and precise: thin rules, numbered section
   labels, skills matrix as tags. ATS-safe single column. */
export default function DataScientistTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  let n = 0;
  const H: HeadingComponent = ({ children }) => {
    n += 1;
    return (
      <div className="mb-2 mt-5 flex items-baseline gap-2.5 border-b border-slate-200 pb-1">
        <span className="text-[11px] font-bold tabular-nums" style={{ color: accent }}>
          {String(n).padStart(2, "0")}
        </span>
        <h2 className="text-[13px] font-extrabold uppercase tracking-[2px] text-slate-900">{children}</h2>
      </div>
    );
  };
  const p = data.personal;

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <div className="flex items-end justify-between gap-6 border-b-2 border-slate-900 pb-4">
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
      <SkillsSection resume={resume} H={H} variant="tags" title="Technical Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
      <ProjectsSection resume={resume} H={H} title="Research & Projects" />
      <EducationSection resume={resume} H={H} variant="modern" />
      <div className="grid grid-cols-2 gap-8">
        <div><CertificationsSection resume={resume} H={H} variant="inline" /></div>
        <div>
          <LanguagesSection resume={resume} H={H} variant="rows" />
          <AwardsSection resume={resume} H={H} />
        </div>
      </div>
    </div>
  );
}
