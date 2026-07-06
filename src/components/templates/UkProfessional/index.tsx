import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* UK Professional — conservative British CV: no photo, centred name,
   "Personal Profile" opener, "Employment History", and the customary
   references line at the foot. */
export default function UkProfessionalTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="caps">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[60px] py-12`} style={{ fontFamily: font }}>
      <div className="text-center">
        <h1 className="text-[26px] font-bold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
        <div className="mt-0.5 text-[13.5px] font-semibold" style={{ color: accent }}>{p.title}</div>
        <div className="mt-1.5 text-[11px] text-slate-600">{contactBits(p).join("  |  ")}</div>
      </div>

      {sections.summary && data.summary && (
        <><H>Personal Profile</H><p className="m-0">{data.summary}</p></>
      )}
      <SkillsSection resume={resume} H={H} variant="pills" title="Key Skills" />
      <ExperienceSection resume={resume} H={H} variant="modern" title="Employment History" />
      <EducationSection resume={resume} H={H} variant="modern" title="Education & Qualifications" />
      <CertificationsSection resume={resume} H={H} variant="inline" title="Professional Qualifications" />
      <ProjectsSection resume={resume} H={H} title="Notable Projects" />
      <div className="grid grid-cols-2 gap-8">
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
        <div><AwardsSection resume={resume} H={H} title="Memberships & Awards" /></div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-3 text-center text-[10.5px] italic text-slate-400">
        References available upon request
      </div>
    </div>
  );
}
