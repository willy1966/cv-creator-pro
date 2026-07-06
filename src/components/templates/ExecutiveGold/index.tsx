import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Executive Gold — luxury corporate: serif identity and headings, a fixed
   gold accent (part of this template's identity, like Classic's serif), and
   generous spacing. */
const GOLD = "#A16207";
const SERIF = "Georgia, 'Times New Roman', serif";

export default function ExecutiveGoldTemplate({ resume }: TemplateProps) {
  const { font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={GOLD} variant="goldserif">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[64px] py-[56px] leading-[1.6]`} style={{ fontFamily: font }}>
      {/* centered serif masthead framed by gold rules */}
      <div className="text-center">
        <div className="mx-auto mb-4 h-px w-24" style={{ background: GOLD }} />
        <div className="text-[32px] font-normal uppercase tracking-[5px] leading-tight" style={{ fontFamily: SERIF }}>
          {fullName(p)}
        </div>
        <div className="mt-2 text-[13px] italic tracking-[1.5px]" style={{ fontFamily: SERIF, color: GOLD }}>
          {p.title}
        </div>
        <div className="mt-3 text-[11px] tracking-wide text-slate-500">
          {contactBits(p).join("   ·   ")}
        </div>
        <div className="mx-auto mt-4 h-px w-24" style={{ background: GOLD }} />
      </div>

      {sections.summary && data.summary && (
        <><H>Profile</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="plain" title="Leadership Experience" />
      <ProjectsSection resume={resume} H={H} />
      <div className="grid grid-cols-2 gap-9">
        <div>
          <EducationSection resume={resume} H={H} variant="compact" />
          <LanguagesSection resume={resume} H={H} variant="rows" />
        </div>
        <div>
          <SkillsSection resume={resume} H={H} variant="tags" title="Core Competencies" />
          <CertificationsSection resume={resume} H={H} variant="inline" />
          <AwardsSection resume={resume} H={H} title="Honors & Awards" />
        </div>
      </div>
    </div>
  );
}
