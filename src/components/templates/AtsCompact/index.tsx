import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, CertificationsSection,
  ProjectsSection, AwardsSection, contactBits, HeadingComponent,
} from "../shared";

/* ATS Compact — dense single column for longer work histories: tighter
   leading, smaller body, reduced heading margins. Still zero graphics. */
export default function AtsCompactTemplate({ resume }: TemplateProps) {
  const { font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-1 mt-3.5 border-b border-slate-400 pb-0.5 text-[12px] font-bold uppercase tracking-[1px] text-slate-900">
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} px-12 py-10 text-[11.5px] leading-[1.45]`} style={{ fontFamily: font }}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h1 className="text-[22px] font-bold leading-tight text-slate-900">{fullName(p)}</h1>
        <span className="text-[12.5px] font-semibold text-slate-700">{p.title}</span>
      </div>
      <div className="mt-1 text-[10.5px] text-slate-600">{contactBits(p).join("  |  ")}</div>

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="plain" title="Experience" />
      <EducationSection resume={resume} H={H} variant="compact" title="Education" />
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
