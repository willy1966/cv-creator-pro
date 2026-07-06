import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint, PAGE } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

const MONO = "ui-monospace, 'Cascadia Code', Consolas, monospace";

/* Full Stack Developer — code-comment headings (// Section), main content
   left with a tech-stack rail on the right. */
export default function FullStackTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;

  const H: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-5 text-[13.5px] font-bold text-slate-900">
      <span style={{ fontFamily: MONO, color: accent }}>{"// "}</span>
      <span className="uppercase tracking-[1.5px]">{children}</span>
    </div>
  );
  const RailH: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-[2px] text-slate-500">
      <span style={{ fontFamily: MONO, color: accent }}>{"> "}</span>{children}
    </div>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font, minHeight: PAGE.minHeight }}>
      {/* header */}
      <div className="border-b-2 px-12 pb-5 pt-11" style={{ borderColor: accent }}>
        <h1 className={tk.name}>
          {fullName(p)}
          <span className="ml-1 text-[22px]" style={{ fontFamily: MONO, color: accent }}>_</span>
        </h1>
        <div className="mt-0.5 text-[13.5px] font-semibold text-slate-600" style={{ fontFamily: MONO }}>{p.title}</div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
          {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_216px] gap-8 px-12 pb-12 pt-1">
        <div>
          {sections.summary && data.summary && (
            <><H>About</H><p className="m-0">{data.summary}</p></>
          )}
          <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
          <ProjectsSection resume={resume} H={H} title="Projects" />
          <EducationSection resume={resume} H={H} variant="modern" />
        </div>
        {/* tech-stack rail */}
        <div className="rounded-lg px-4 pb-4 pt-0.5" style={{ background: tint.soft(accent) }}>
          <SkillsSection resume={resume} H={RailH} variant="dots" title="Tech Stack" />
          <CertificationsSection resume={resume} H={RailH} variant="stacked" />
          <LanguagesSection resume={resume} H={RailH} variant="rows" />
          <AwardsSection resume={resume} H={RailH} />
        </div>
      </div>
    </div>
  );
}
