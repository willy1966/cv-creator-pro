import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

const SERIF = "Georgia, 'Times New Roman', serif";

/* Signature — personal brand: an italic serif name rendered like a signature
   over a sweeping accent stroke, generous margins, and italic serif section
   labels beside roman body text. */
export default function SignatureTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-2.5 mt-7 flex items-baseline gap-3">
      <span className="text-[17px] italic text-slate-900" style={{ fontFamily: SERIF }}>{children}</span>
      <span className="h-px flex-1 self-center bg-slate-200" />
    </div>
  );

  return (
    <div className={`${tk.page} px-[68px] py-14 leading-[1.65]`} style={{ fontFamily: font }}>
      {/* signature masthead */}
      <div className="text-center">
        <h1 className="text-[40px] italic leading-tight tracking-[1px] text-slate-900" style={{ fontFamily: SERIF }}>
          {fullName(p)}
        </h1>
        {/* signature stroke */}
        <svg viewBox="0 0 220 14" className="mx-auto -mt-1 h-3.5 w-[220px]" aria-hidden>
          <path d="M4 10 C 60 2, 150 14, 216 6" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="mt-2 text-[12px] uppercase tracking-[3.5px] text-slate-500">{p.title}</div>
        <div className="mt-2 text-[11px] text-slate-500">{contactBits(p).join("   ·   ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Profile</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="plain" title="Experience" />
      <ProjectsSection resume={resume} H={H} title="Selected Work" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education" />
      <div className="grid grid-cols-2 gap-9">
        <div>
          <SkillsSection resume={resume} H={H} variant="pills" title="Expertise" />
          <LanguagesSection resume={resume} H={H} variant="rows" />
        </div>
        <div>
          <CertificationsSection resume={resume} H={H} variant="inline" title="Credentials" />
          <AwardsSection resume={resume} H={H} title="Recognition" />
        </div>
      </div>
    </div>
  );
}
