import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Photographer — dark full-bleed hero with a large centered portrait and
   wide-tracked name; quiet gallery-style body with hairline headings. */
export default function PhotographerTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-3 mt-7 text-center">
      <span className="text-[11px] font-bold uppercase tracking-[5px] text-slate-800">{children}</span>
      <div className="mx-auto mt-1.5 h-px w-10" style={{ background: accent }} />
    </div>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      {/* dark hero */}
      <div className="bg-slate-950 px-14 pb-10 pt-12 text-center text-white">
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.photo}
            alt=""
            className="mx-auto mb-5 h-[132px] w-[132px] rounded-full border-2 object-cover"
            style={{ borderColor: accent }}
          />
        )}
        <h1 className="text-[28px] font-light uppercase tracking-[8px] leading-tight">{fullName(p)}</h1>
        <div className="mt-2 text-[12px] uppercase tracking-[4px]" style={{ color: accent }}>{p.title}</div>
        <div className="mt-3.5 text-[10.5px] tracking-[1px] text-slate-400">{contactBits(p).join("   ·   ")}</div>
      </div>

      <div className="px-16 pb-12 pt-2">
        {sections.summary && data.summary && (
          <><H>About</H><p className="mx-auto my-0 max-w-[560px] text-center">{data.summary}</p></>
        )}
        <ProjectsSection resume={resume} H={H} title="Portfolio Highlights" />
        <ExperienceSection resume={resume} H={H} variant="plain" title="Experience" />
        <EducationSection resume={resume} H={H} variant="center" />
        <SkillsSection resume={resume} H={H} variant="inline" title="Specialties" />
        <LanguagesSection resume={resume} H={H} variant="inline" />
        <CertificationsSection resume={resume} H={H} variant="center" />
        <AwardsSection resume={resume} H={H} />
      </div>
    </div>
  );
}
