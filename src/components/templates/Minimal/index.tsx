import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ResumeHeader, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, CertificationsSection,
  ProjectsSection, AwardsSection, ResumeFooter, HeadingComponent,
} from "../shared";

export default function MinimalTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="center">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-16 py-14 leading-[1.6]`} style={{ fontFamily: font }}>
      <ResumeHeader resume={resume} variant="center" />
      {sections.summary && data.summary && (
        <><H>Profile</H><p className="mx-auto my-0 max-w-[560px] text-center">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="plain" />
      <ProjectsSection resume={resume} H={H} />
      <EducationSection resume={resume} H={H} variant="center" />
      <SkillsSection resume={resume} H={H} variant="inline" />
      <LanguagesSection resume={resume} H={H} variant="inline" />
      <CertificationsSection resume={resume} H={H} variant="center" />
      <AwardsSection resume={resume} H={H} />
      <ResumeFooter resume={resume} />
    </div>
  );
}
