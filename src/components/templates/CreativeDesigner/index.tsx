import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint, PAGE } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Creative Designer — accent-tinted sidebar color block with a large photo,
   oversized display name, solid accent heading chips in the main column. */
export default function CreativeDesignerTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;

  const SideH: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-6 text-[11px] font-extrabold uppercase tracking-[3px]" style={{ color: accent }}>
      {children}
    </div>
  );
  const MainH: HeadingComponent = ({ children }) => (
    <div className="mb-3 mt-6 inline-block px-3 py-1 text-[12px] font-extrabold uppercase tracking-[2px] text-white" style={{ background: accent }}>
      {children}
    </div>
  );

  return (
    <div className={`${tk.page} grid grid-cols-[260px_1fr]`} style={{ fontFamily: font, minHeight: PAGE.minHeight }}>
      {/* tinted color-block sidebar */}
      <div className="px-7 py-11" style={{ background: tint.soft(accent) }}>
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="mb-5 block h-[150px] w-[150px] rounded-2xl border-4 border-white object-cover shadow-sm" />
        )}
        <div className="text-[30px] font-black leading-[1.05] tracking-tight text-slate-900">{fullName(p)}</div>
        <div className="mt-2 text-[13px] font-bold uppercase tracking-[1.5px]" style={{ color: accent }}>{p.title}</div>

        <SideH>Contact</SideH>
        {contactBits(p).map((c, i) => (
          <div key={i} className="mb-1.5 break-words text-[11px] text-slate-700">{c}</div>
        ))}
        <SkillsSection resume={resume} H={SideH} variant="dots" />
        <LanguagesSection resume={resume} H={SideH} variant="rows" />
      </div>

      {/* main column */}
      <div className="px-10 py-11">
        {sections.summary && data.summary && (
          <><div><MainH>Hello!</MainH></div><p className="m-0">{data.summary}</p></>
        )}
        <div><ExperienceSection resume={resume} H={MainH} variant="modern" title="Experience" /></div>
        <div><ProjectsSection resume={resume} H={MainH} title="Selected Work" /></div>
        <div><EducationSection resume={resume} H={MainH} variant="modern" /></div>
        <div><CertificationsSection resume={resume} H={MainH} variant="inline" /></div>
        <div><AwardsSection resume={resume} H={MainH} /></div>
      </div>
    </div>
  );
}
