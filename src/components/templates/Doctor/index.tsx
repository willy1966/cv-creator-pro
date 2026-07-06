import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, CertificationsSection,
  ProjectsSection, AwardsSection, contactBits, HeadingComponent,
} from "../shared";

/* Doctor — dignified serif CV: centered masthead with a double rule,
   licenses & certifications immediately after the profile, clinical
   experience and education in formal order. ATS-safe single column. */
const SERIF = "Georgia, 'Times New Roman', serif";

export default function DoctorTemplate({ resume }: TemplateProps) {
  const { accent, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="caps">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[62px] py-[52px] leading-[1.6]`} style={{ fontFamily: SERIF }}>
      <div className="border-b-[3px] border-double border-slate-800 pb-4 text-center">
        <h1 className="text-[27px] font-bold leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-0.5 text-[13.5px] italic" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11px] text-slate-600">{contactBits(p).join("  |  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Professional Profile</H><p className="m-0">{data.summary}</p></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" title="Licenses & Certifications" />
      <ExperienceSection resume={resume} H={H} variant="classic" title="Clinical Experience" />
      <EducationSection resume={resume} H={H} variant="classic" title="Education & Training" />
      <ProjectsSection resume={resume} H={H} title="Research" />
      <AwardsSection resume={resume} H={H} title="Professional Memberships & Honors" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Areas of Expertise</H><div>{data.skills.join(" · ")}</div></>
      )}
      {sections.languages && data.languages.length > 0 && (
        <><H>Languages</H><div>{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</div></>
      )}
    </div>
  );
}
