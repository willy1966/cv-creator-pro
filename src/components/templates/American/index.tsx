import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, CertificationsSection,
  ProjectsSection, AwardsSection, contactBits, HeadingComponent,
} from "../shared";

/* American Professional — the classic one-page US resume: centred bold name,
   thin rules, tight direct sections, no photo, achievement-led. */
export default function AmericanTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-1.5 mt-4 border-b-[1.5px] border-slate-800 pb-0.5 text-[12.5px] font-bold uppercase tracking-[1.5px] text-slate-900">
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} px-[58px] py-11 text-[12px] leading-[1.5]`} style={{ fontFamily: font }}>
      <div className="text-center">
        <h1 className="text-[25px] font-extrabold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-0.5 text-[12.5px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1 text-[10.5px] text-slate-600">{contactBits(p).join(" | ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Skills</H><div>{data.skills.join(", ")}</div></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certifications" />
      <ProjectsSection resume={resume} H={H} title="Selected Projects" />
      <div className="grid grid-cols-2 gap-7">
        <div><AwardsSection resume={resume} H={H} title="Honors & Awards" /></div>
        <div>
          {sections.languages && data.languages.length > 0 && (
            <><H>Languages</H><div>{data.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</div></>
          )}
        </div>
      </div>
    </div>
  );
}
