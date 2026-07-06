import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint, PAGE } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

const MONO = "ui-monospace, 'Cascadia Code', Consolas, monospace";

/* Cybersecurity Specialist — dark ops sidebar with bracketed mono headings,
   certifications given sidebar prominence (they matter most in security). */
export default function CybersecurityTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;

  const SideH: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-6 text-[10.5px] font-bold uppercase tracking-[2px] text-slate-400" style={{ fontFamily: MONO }}>
      <span style={{ color: accent }}>[</span> {children} <span style={{ color: accent }}>]</span>
    </div>
  );
  const MainH: HeadingComponent = ({ children }) => (
    <div className="mb-2.5 mt-6 text-[13px] font-extrabold uppercase tracking-[2px] text-slate-900">
      <span style={{ fontFamily: MONO, color: accent }}>{">> "}</span>{children}
    </div>
  );

  return (
    <div className={`${tk.page} grid grid-cols-[248px_1fr]`} style={{ fontFamily: font, minHeight: PAGE.minHeight }}>
      {/* ops sidebar */}
      <div className="bg-slate-950 px-6 py-10 text-slate-300">
        <div className="mb-4 h-1 w-10" style={{ background: accent }} />
        <div className="text-[23px] font-extrabold leading-[1.15] text-white">{fullName(p)}</div>
        <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[1.5px]" style={{ fontFamily: MONO, color: accent }}>
          {p.title}
        </div>

        <SideH>Contact</SideH>
        {contactBits(p).map((c, i) => (
          <div key={i} className="mb-1.5 break-words text-[10.5px]">{c}</div>
        ))}
        <CertificationsSection resume={resume} H={SideH} variant="stacked" />
        <LanguagesSection resume={resume} H={SideH} variant="dark" />
      </div>

      {/* main column */}
      <div className="px-10 py-10">
        {sections.summary && data.summary && (
          <><MainH>Profile</MainH><p className="m-0">{data.summary}</p></>
        )}
        <SkillsSection resume={resume} H={MainH} variant="tags" title="Technical Skills" />
        <ExperienceSection resume={resume} H={MainH} variant="modern" title="Experience" />
        <ProjectsSection resume={resume} H={MainH} title="Security Projects" />
        <EducationSection resume={resume} H={MainH} variant="compact" />
        <AwardsSection resume={resume} H={MainH} />
      </div>
    </div>
  );
}
