import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Elite — commanding executive: full-black masthead with a large squared
   portrait, accent underscore on the name, and a disciplined grid below. */
export default function EliteTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-2.5 mt-6">
      <span
        className="border-b-2 pb-1 text-[13px] font-extrabold uppercase tracking-[2.5px] text-slate-900"
        style={{ borderColor: accent }}
      >{children}</span>
    </div>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      {/* black masthead */}
      <div className="flex items-stretch bg-black text-white">
        <div className="flex-1 px-[56px] py-11">
          <h1 className="text-[34px] font-black uppercase tracking-[1px] leading-[1.05]">
            {p.firstName || "Your"}{" "}
            <span style={{ color: accent }}>{p.lastName || "Name"}</span>
          </h1>
          <div className="mt-2 h-[3px] w-14" style={{ background: accent }} />
          <div className="mt-2.5 text-[13px] font-semibold uppercase tracking-[2.5px] text-slate-300">{p.title}</div>
          <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-1 text-[10.5px] tracking-wide text-slate-400">
            {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="w-[168px] object-cover" />
        )}
      </div>

      <div className="px-[56px] pb-12 pt-2">
        {sections.summary && data.summary && (
          <><H>Executive Profile</H><p className="m-0 leading-[1.65]">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={H} variant="railed" title="Leadership Experience" />
        <ProjectsSection resume={resume} H={H} title="Signature Achievements" />
        <div className="mt-1 grid grid-cols-2 gap-9">
          <div>
            <EducationSection resume={resume} H={H} variant="compact" />
            <LanguagesSection resume={resume} H={H} variant="rows" />
          </div>
          <div>
            <SkillsSection resume={resume} H={H} variant="tags" title="Core Strengths" />
            <CertificationsSection resume={resume} H={H} variant="inline" />
            <AwardsSection resume={resume} H={H} title="Honors" />
          </div>
        </div>
      </div>

      {/* foot rule */}
      <div className="mx-[56px] border-t pt-2 pb-6 text-[9.5px] uppercase tracking-[3px] text-slate-400" style={{ borderColor: tint.border(accent) }}>
        {fullName(p)} — {p.title}
      </div>
    </div>
  );
}
