import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, CertificationsSection,
  ProjectsSection, AwardsSection, contactBits, HeadingComponent,
} from "../shared";

/* ATS Standard — the plainest template in the system: reads like a cleanly
   formatted word-processor document. No color, no rules except a single
   heading underline, maximum parser compatibility. */
export default function AtsStandardTemplate({ resume }: TemplateProps) {
  const { font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-1.5 mt-4 text-[13.5px] font-bold text-slate-900 underline underline-offset-4">
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} px-16 py-12`} style={{ fontFamily: font }}>
      <h1 className="text-center text-[24px] font-bold leading-tight text-slate-900">{fullName(p)}</h1>
      <div className="text-center text-[13px] text-slate-700">{p.title}</div>
      <div className="mt-1 text-center text-[11.5px] text-slate-600">{contactBits(p).join(" | ")}</div>

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="plain" title="Work Experience" />
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
