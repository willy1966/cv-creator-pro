import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ResumeHeader, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, CertificationsSection,
  ProjectsSection, AwardsSection, HeadingComponent,
} from "../shared";

export default function ModernTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="rule">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} p-12`} style={{ fontFamily: font }}>
      <ResumeHeader resume={resume} variant="rail" />
      <div className="mt-2 grid grid-cols-[1fr_220px] gap-8">
        <div>
          {sections.summary && data.summary && (
            <><H>Profile</H><p className="m-0">{data.summary}</p></>
          )}
          <ExperienceSection resume={resume} H={H} variant="modern" />
          <ProjectsSection resume={resume} H={H} />
          <EducationSection resume={resume} H={H} variant="modern" />
        </div>
        <div>
          <SkillsSection resume={resume} H={H} variant="pills" />
          <LanguagesSection resume={resume} H={H} variant="rows" />
          <CertificationsSection resume={resume} H={H} variant="stacked" />
          <AwardsSection resume={resume} H={H} />
        </div>
      </div>
    </div>
  );
}
