import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ResumeHeader, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, CertificationsSection,
  ProjectsSection, AwardsSection, HeadingComponent,
} from "../shared";

export default function ExecutiveTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="bar">{children}</SectionHeading>
  );

  return (
    <div className={tk.page} style={{ fontFamily: font }}>
      <ResumeHeader resume={resume} variant="band" />
      <div className="px-[52px] pb-12 pt-2.5">
        {sections.summary && data.summary && (
          <><H>Executive Summary</H><p className="m-0">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={H} variant="railed" title="Leadership & Experience" />
        <ProjectsSection resume={resume} H={H} />
        <div className="grid grid-cols-2 gap-7">
          <div>
            <EducationSection resume={resume} H={H} variant="compact" />
            <LanguagesSection resume={resume} H={H} variant="rows" />
          </div>
          <div>
            <SkillsSection resume={resume} H={H} variant="tags" title="Core Competencies" />
            <CertificationsSection resume={resume} H={H} variant="inline" />
            <AwardsSection resume={resume} H={H} />
          </div>
        </div>
      </div>
    </div>
  );
}
