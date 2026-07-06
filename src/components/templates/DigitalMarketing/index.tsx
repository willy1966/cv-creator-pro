import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, tint } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection, LanguagesSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Digital Marketing — energetic gradient header band with photo, bold accent
   headings and pill skills; single-column body for pace. */
export default function DigitalMarketingTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-5 flex items-baseline gap-2">
      <span className="text-[15px] font-black" style={{ color: accent }}>/</span>
      <span className="text-[13px] font-extrabold uppercase tracking-[2px] text-slate-900">{children}</span>
    </div>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      {/* gradient band */}
      <div
        className="flex items-center gap-6 px-14 py-10 text-white"
        style={{ background: `linear-gradient(120deg, #0F172A 0%, ${accent} 130%)` }}
      >
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="h-[104px] w-[104px] shrink-0 rounded-full border-[3px] border-white/80 object-cover" />
        )}
        <div>
          <h1 className="text-[30px] font-black tracking-tight leading-tight">{fullName(p)}</h1>
          <div className="mt-1 inline-block rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[1.5px]" style={{ background: tint.border(accent) }}>
            {p.title}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-200">
            {contactBits(p).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>

      <div className="px-14 pb-12 pt-2">
        {sections.summary && data.summary && (
          <><H>Profile</H><p className="m-0">{data.summary}</p></>
        )}
        <SkillsSection resume={resume} H={H} variant="pills" title="Channels & Skills" />
        <ExperienceSection resume={resume} H={H} variant="modern" title="Campaign Experience" />
        <ProjectsSection resume={resume} H={H} title="Highlight Projects" />
        <div className="grid grid-cols-2 gap-8">
          <div><EducationSection resume={resume} H={H} variant="compact" /></div>
          <div>
            <CertificationsSection resume={resume} H={H} variant="inline" />
            <LanguagesSection resume={resume} H={H} variant="rows" />
            <AwardsSection resume={resume} H={H} />
          </div>
        </div>
      </div>
    </div>
  );
}
