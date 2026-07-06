import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, PAGE } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Platinum — cool minimal luxe: a pale silver panel carries identity and
   meta, featherweight display type, accent used only as a whisper. */
export default function PlatinumTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;

  const PanelH: HeadingComponent = ({ children }) => (
    <div className="mb-2.5 mt-8 text-[10px] font-bold uppercase tracking-[4px] text-slate-400">{children}</div>
  );
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-3 mt-7 flex items-baseline gap-3">
      <span className="text-[13px] font-semibold uppercase tracking-[3px] text-slate-800">{children}</span>
      <span className="h-px flex-1 self-center bg-slate-200" />
      <span className="h-1 w-1 self-center rounded-full" style={{ background: accent }} />
    </div>
  );

  return (
    <div className={`${tk.page} grid grid-cols-[256px_1fr]`} style={{ fontFamily: font, minHeight: PAGE.minHeight }}>
      {/* silver identity panel */}
      <div className="border-r border-slate-200 bg-slate-50 px-8 py-12">
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="mb-6 h-[120px] w-[120px] rounded-full border border-slate-200 object-cover grayscale" />
        )}
        <div className="text-[28px] font-extralight leading-[1.15] tracking-tight text-slate-900">
          {p.firstName || "Your"}<br />
          <span className="font-semibold">{p.lastName || "Name"}</span>
        </div>
        <div className="mt-3 h-px w-8" style={{ background: accent }} />
        <div className="mt-3 text-[11px] font-medium uppercase tracking-[2.5px] text-slate-500">{p.title}</div>

        <PanelH>Contact</PanelH>
        {contactBits(p).map((c, i) => (
          <div key={i} className="mb-1.5 break-words text-[10.5px] leading-[1.6] text-slate-600">{c}</div>
        ))}
        <SkillsSection resume={resume} H={PanelH} variant="dots" />
        <LanguagesSection resume={resume} H={PanelH} variant="rows" />
        <CertificationsSection resume={resume} H={PanelH} variant="stacked" />
      </div>

      {/* main column */}
      <div className="px-11 py-12">
        {sections.summary && data.summary && (
          <><H>Profile</H><p className="m-0 leading-[1.7]">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={H} variant="plain" title="Experience" />
        <ProjectsSection resume={resume} H={H} title="Selected Work" />
        <EducationSection resume={resume} H={H} variant="modern" title="Education" />
        <AwardsSection resume={resume} H={H} title="Distinctions" />
      </div>
    </div>
  );
}
