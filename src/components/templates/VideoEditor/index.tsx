import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint, PAGE } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Video Editor — dark "timeline" sidebar with accent track bars, condensed
   caps identity, photo framed like a monitor. */
export default function VideoEditorTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;

  const SideH: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-6 flex items-center gap-2">
      <span className="h-[3px] w-5 rounded-sm" style={{ background: accent }} />
      <span className="text-[10.5px] font-extrabold uppercase tracking-[2.5px] text-slate-400">{children}</span>
    </div>
  );
  const MainH: HeadingComponent = ({ children }) => (
    <div className="mb-2.5 mt-6 border-l-4 pl-3 text-[13px] font-extrabold uppercase tracking-[2px] text-slate-900" style={{ borderColor: accent }}>
      {children}
    </div>
  );

  return (
    <div className={`${tk.page} grid grid-cols-[240px_1fr]`} style={{ fontFamily: font, minHeight: PAGE.minHeight }}>
      {/* dark timeline sidebar */}
      <div className="bg-slate-950 px-6 py-10 text-slate-300">
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="mb-4 block aspect-video w-full rounded border-2 object-cover" style={{ borderColor: accent }} />
        )}
        <div className="text-[24px] font-black uppercase leading-[1.1] tracking-tight text-white">{fullName(p)}</div>
        <div className="mt-1.5 text-[11.5px] font-bold uppercase tracking-[2px]" style={{ color: accent }}>{p.title}</div>
        {/* timeline track bars */}
        <div className="mt-4 flex flex-col gap-1">
          <div className="h-1 w-full rounded-full" style={{ background: accent }} />
          <div className="h-1 w-3/4 rounded-full" style={{ background: tint.border(accent) }} />
          <div className="h-1 w-1/2 rounded-full bg-slate-700" />
        </div>

        <SideH>Contact</SideH>
        {contactBits(p).map((c, i) => (
          <div key={i} className="mb-1.5 break-words text-[10.5px]">{c}</div>
        ))}
        <SkillsSection resume={resume} H={SideH} variant="dots" title="Tools" />
        <LanguagesSection resume={resume} H={SideH} variant="dark" />
      </div>

      {/* main column */}
      <div className="px-10 py-10">
        {sections.summary && data.summary && (
          <><MainH>Profile</MainH><p className="m-0">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={MainH} variant="modern" title="Production Experience" />
        <ProjectsSection resume={resume} H={MainH} title="Featured Projects" />
        <EducationSection resume={resume} H={MainH} variant="compact" />
        <CertificationsSection resume={resume} H={MainH} variant="inline" />
        <AwardsSection resume={resume} H={MainH} />
      </div>
    </div>
  );
}
