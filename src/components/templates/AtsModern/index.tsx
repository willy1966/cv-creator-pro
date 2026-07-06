import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, CertificationsSection,
  ProjectsSection, AwardsSection, contactBits, HeadingComponent,
} from "../shared";

/* ATS Modern — parser-safe single column with a contemporary feel: accent-
   colored headings (color is text, not graphics) and an accent name rule.
   No photo, icons, tables, or columns. */
export default function AtsModernTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-2 mt-5 text-[13px] font-extrabold uppercase tracking-[2px]" style={{ color: accent }}>
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <h1 className="text-[28px] font-extrabold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
      <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
      <div className="mt-1.5 border-b-2 pb-3 text-[11.5px] text-slate-600" style={{ borderColor: accent }}>
        {contactBits(p).join("   ·   ")}
      </div>

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
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
