import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint, PAGE } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

const SERIF = "Georgia, 'Times New Roman', serif";

/* Prestige — editorial luxury: a serif monogram seal on a deep charcoal
   band, small-caps serif name, asymmetric grid with a quiet meta column,
   and hairline discipline throughout. */
export default function PrestigeTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const initials = `${(p.firstName || "Y")[0] || ""}${(p.lastName || "N")[0] || ""}`.toUpperCase();

  const H: HeadingComponent = ({ children }) => (
    <div className="mb-3 mt-7">
      <div className="text-[12px] font-semibold uppercase tracking-[4px] text-slate-900" style={{ fontFamily: SERIF }}>
        {children}
      </div>
      <div className="mt-1.5 flex items-center gap-1">
        <span className="h-px w-7" style={{ background: accent }} />
        <span className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
  const MetaH: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-7 text-[10px] font-bold uppercase tracking-[3.5px] text-slate-400">{children}</div>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font, minHeight: PAGE.minHeight }}>
      {/* charcoal masthead */}
      <div className="bg-[#16181D] px-[60px] pb-9 pt-11 text-white">
        <div className="flex items-center gap-7">
          <div
            className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border text-[24px] tracking-[2px]"
            style={{ borderColor: accent, color: accent, fontFamily: SERIF }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-[30px] font-normal uppercase tracking-[4px] leading-tight" style={{ fontFamily: SERIF }}>
              {fullName(p)}
            </h1>
            <div className="mt-1.5 text-[12px] uppercase tracking-[3px] text-slate-400">{p.title}</div>
          </div>
          {p.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.photo} alt="" className="h-[86px] w-[86px] shrink-0 rounded-full border object-cover" style={{ borderColor: accent }} />
          )}
        </div>
      </div>
      {/* accent hairline */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${tint.line(accent)})` }} />

      {/* asymmetric grid */}
      <div className="grid grid-cols-[1fr_190px] gap-10 px-[60px] pb-12 pt-2">
        <div>
          {sections.summary && data.summary && (
            <><H>Profile</H><p className="m-0 text-[12.5px] leading-[1.65]">{data.summary}</p></>
          )}
          <ExperienceSection resume={resume} H={H} variant="modern" title="Experience" />
          <ProjectsSection resume={resume} H={H} title="Selected Engagements" />
          <EducationSection resume={resume} H={H} variant="modern" title="Education" />
        </div>
        <div className="border-l border-slate-200 pl-7">
          <MetaH>Contact</MetaH>
          {contactBits(p).map((c, i) => (
            <div key={i} className="mb-1.5 break-words text-[10.5px] leading-[1.6] text-slate-600">{c}</div>
          ))}
          <SkillsSection resume={resume} H={MetaH} variant="dots" title="Expertise" />
          <LanguagesSection resume={resume} H={MetaH} variant="rows" />
          <CertificationsSection resume={resume} H={MetaH} variant="stacked" />
          <AwardsSection resume={resume} H={MetaH} title="Honors" />
        </div>
      </div>
    </div>
  );
}
