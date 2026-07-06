import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection, HeadingComponent,
} from "../shared";

const MONO = "ui-monospace, 'Cascadia Code', Consolas, monospace";

/* Software Engineer — clean single-column dev resume: mono </> heading
   markers, GitHub/portfolio links called out under the name, technical
   skills and projects before experience. ATS-safe structure. */
export default function SoftwareEngineerTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <h2 className="mb-2 mt-5 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[2px] text-slate-900">
      <span className="text-[12px] font-bold" style={{ fontFamily: MONO, color: accent }}>{"</>"}</span>
      {children}
    </h2>
  );

  return (
    <div className={`${tk.page} px-14 py-12`} style={{ fontFamily: font }}>
      <h1 className={tk.name}>{fullName(p)}</h1>
      <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
      <div className="mt-1.5 text-[11.5px] text-slate-600">
        {[p.email, p.phone, p.location].filter(Boolean).join("  ·  ")}
      </div>
      {/* dev links row */}
      {(p.linkedin || p.website) && (
        <div className="mt-2 flex flex-wrap gap-2 border-b pb-3.5" style={{ borderColor: accent }}>
          {[p.website, p.linkedin].filter(Boolean).map((l, i) => (
            <span key={i} className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10.5px] text-slate-700" style={{ fontFamily: MONO }}>
              {l}
            </span>
          ))}
        </div>
      )}

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <SkillsSection resume={resume} H={H} variant="tags" title="Technical Skills" />
      <ProjectsSection resume={resume} H={H} title="Projects" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
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
