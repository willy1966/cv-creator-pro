import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

const MONO = "ui-monospace, 'Cascadia Code', Consolas, monospace";

/* DevOps Engineer — terminal-window header (traffic-light dots, $ whoami)
   and shell-prompt section headings. */
export default function DevOpsTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-5 text-[12.5px] font-bold uppercase tracking-[1.5px] text-slate-900">
      <span style={{ fontFamily: MONO, color: accent }}>$ </span>{children}
    </div>
  );

  return (
    <div className={`${tk.page} px-12 py-10`} style={{ fontFamily: font }}>
      {/* terminal header */}
      <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
        <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3.5 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[10px] text-slate-500" style={{ fontFamily: MONO }}>~/resume</span>
        </div>
        <div className="px-5 py-4" style={{ fontFamily: MONO }}>
          <div className="text-[11px] text-slate-500">$ whoami</div>
          <h1 className="mt-1 text-[24px] font-bold leading-tight text-white">{fullName(p)}</h1>
          <div className="mt-0.5 text-[12.5px]" style={{ color: accent }}>{p.title}</div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>

      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <SkillsSection resume={resume} H={H} variant="tags" title="Technical Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
      <ProjectsSection resume={resume} H={H} title="Projects" />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <EducationSection resume={resume} H={H} variant="compact" />
          <LanguagesSection resume={resume} H={H} variant="rows" />
        </div>
        <div>
          <CertificationsSection resume={resume} H={H} variant="inline" />
          <AwardsSection resume={resume} H={H} />
        </div>
      </div>
    </div>
  );
}
