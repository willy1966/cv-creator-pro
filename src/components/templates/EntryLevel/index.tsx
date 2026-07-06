import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Entry Level Professional — a confident first-job resume: modern underlined
   headings, summary + skills up top, then experience and education. */
export default function EntryLevelTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="underline">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className={tk.name}>{fullName(p)}</h1>
          <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        </div>
        <div className="pb-1 text-right text-[11px] leading-[1.7] text-slate-600">
          {contactBits(p).slice(0, 3).map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>
      <div className="mt-2 text-[11px] text-slate-500">
        {contactBits(p).slice(3).join("  ·  ")}
      </div>

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <SkillsSection resume={resume} H={H} variant="pills" title="Key Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
      <ProjectsSection resume={resume} H={H} title="Projects" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Certificates" />
      <LanguagesSection resume={resume} H={H} variant="rows" />
      <AwardsSection resume={resume} H={H} />
    </div>
  );
}
