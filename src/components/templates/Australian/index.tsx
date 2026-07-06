import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Australian Professional — relaxed-clean AU resume: no photo, career
   summary opener, key skills prominent, roomier spacing (AU resumes run
   longer), and a referees line at the foot. */
export default function AustralianTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="rule">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} leading-[1.6]`} style={{ fontFamily: font }}>
      {/* full-width accent strip header */}
      <div className="h-2.5 w-full" style={{ background: accent }} />
      <div className="flex items-end justify-between gap-6 px-14 pt-9">
        <div>
          <h1 className={tk.name}>{fullName(p)}</h1>
          <div className="mt-0.5 text-[14px] font-semibold" style={{ color: accent }}>{p.title}</div>
        </div>
        <div className="pb-0.5 text-right text-[11px] leading-[1.7] text-slate-600">
          {contactBits(p).slice(0, 3).map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>
      <div className="px-14 pb-12">
      {contactBits(p).length > 3 && (
        <div className="mt-1 text-[11px] text-slate-500">{contactBits(p).slice(3).join("  ·  ")}</div>
      )}

      {sections.summary && data.summary && (
        <><H>Career Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <SkillsSection resume={resume} H={H} variant="pills" title="Key Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Professional Experience" />
      <ProjectsSection resume={resume} H={H} title="Key Projects" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education & Training" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Licences & Certifications" />
      <div className="grid grid-cols-2 gap-8">
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div><AwardsSection resume={resume} H={H} title="Memberships & Awards" /></div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-3 text-center text-[10.5px] italic text-slate-400">
        Referees available on request
      </div>
      </div>
    </div>
  );
}
