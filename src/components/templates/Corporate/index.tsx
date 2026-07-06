import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  HeadingComponent,
} from "../shared";

/* Corporate — traditional business layout: gray header block, tinted band
   section headings, single-column, deliberately plain for HR/ATS parsing. */
export default function CorporateTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="boxed">{children}</SectionHeading>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      {/* header block */}
      <div className="border-b-2 bg-slate-50 px-14 py-9" style={{ borderColor: accent }}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[27px] font-bold tracking-tight leading-tight">{fullName(p)}</div>
            <div className="mt-0.5 text-[14px] font-semibold text-slate-600">{p.title}</div>
          </div>
          {p.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.photo} alt="" className="h-20 w-20 shrink-0 rounded object-cover" />
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-slate-600">
          {[p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>

      <div className="px-14 pb-12 pt-2">
        {sections.summary && data.summary && (
          <><H>Professional Summary</H><p className="m-0">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={H} variant="modern" title="Work Experience" />
        <EducationSection resume={resume} H={H} variant="modern" />
        <ProjectsSection resume={resume} H={H} />
        {sections.skills && data.skills.length > 0 && (
          <><H>Skills</H><div>{data.skills.join("  ·  ")}</div></>
        )}
        {sections.languages && data.languages.length > 0 && (
          <><H>Languages</H><div>{data.languages.map((l) => `${l.name} (${l.level})`).join("  ·  ")}</div></>
        )}
        <CertificationsSection resume={resume} H={H} variant="inline" />
        <AwardsSection resume={resume} H={H} />
      </div>
    </div>
  );
}
