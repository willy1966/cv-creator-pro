import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  ResumeFooter, HeadingComponent,
} from "../shared";

/* Elegant — refined typography with soft gray accents: serif masthead,
   centered hairline section dividers, narrow left contact column separated
   by a vertical hairline. */
const SERIF = "Georgia, 'Times New Roman', serif";

export default function ElegantTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="divider">{children}</SectionHeading>
  );
  const SideH: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-6 text-[10.5px] font-semibold uppercase tracking-[3px] text-slate-400">{children}</div>
  );

  return (
    <div className={`${tk.page} px-14 py-12 leading-[1.6]`} style={{ fontFamily: font }}>
      {/* serif masthead */}
      <div className="pb-6 text-center">
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="mx-auto mb-4 h-[88px] w-[88px] rounded-full border border-slate-200 object-cover" />
        )}
        <div className="text-[31px] tracking-[2px] leading-tight" style={{ fontFamily: SERIF }}>{fullName(p)}</div>
        <div className="mt-1.5 text-[12.5px] italic text-slate-500" style={{ fontFamily: SERIF }}>{p.title}</div>
      </div>

      {/* two columns split by a vertical hairline */}
      <div className="grid grid-cols-[200px_1fr] gap-9">
        <div className="border-r border-slate-200 pr-7">
          <SideH>Contact</SideH>
          {[p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).map((c, i) => (
            <div key={i} className="mb-1.5 break-words text-[11px] text-slate-600">{c}</div>
          ))}
          <SkillsSection resume={resume} H={SideH} variant="dots" />
          <LanguagesSection resume={resume} H={SideH} variant="rows" />
          <CertificationsSection resume={resume} H={SideH} variant="stacked" />
          <AwardsSection resume={resume} H={SideH} />
        </div>
        <div>
          {sections.summary && data.summary && (
            <><H>Profile</H><p className="m-0">{data.summary}</p></>
          )}
          <ExperienceSection resume={resume} H={H} variant="plain" />
          <ProjectsSection resume={resume} H={H} />
          <EducationSection resume={resume} H={H} variant="modern" />
        </div>
      </div>

      <ResumeFooter resume={resume} />
    </div>
  );
}
