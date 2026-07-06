import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, CertificationsSection,
  ProjectsSection, AwardsSection, contactBits, HeadingComponent,
} from "../shared";

/* ATS Executive — senior-level tone in a parser-safe single column: serif
   type, centered masthead, letterspaced headings over a plain rule. */
const SERIF = "Georgia, 'Times New Roman', serif";

export default function AtsExecutiveTemplate({ resume }: TemplateProps) {
  const { data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-2 mt-5 border-b border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-[2.5px] text-slate-900">
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} px-[60px] py-[52px]`} style={{ fontFamily: SERIF }}>
      <div className="border-b-2 border-slate-800 pb-4 text-center">
        <h1 className="text-[27px] font-bold uppercase tracking-[3px] leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-1 text-[13px] italic text-slate-700">{p.title}</div>
        <div className="mt-1.5 text-[11px] text-slate-600">{contactBits(p).join("  |  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Executive Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="classic" title="Professional Experience" />
      <EducationSection resume={resume} H={H} variant="classic" title="Education" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Core Competencies</H><div>{data.skills.join(" · ")}</div></>
      )}
      {sections.languages && data.languages.length > 0 && (
        <><H>Languages</H><div>{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</div></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" />
      <ProjectsSection resume={resume} H={H} />
      <AwardsSection resume={resume} H={H} title="Honors & Awards" />
    </div>
  );
}
