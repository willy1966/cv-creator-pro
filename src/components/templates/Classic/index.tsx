import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ResumeHeader, ExperienceSection, EducationSection,
  SkillsSection, LanguagesSection, CertificationsSection,
  ProjectsSection, AwardsSection, HeadingComponent,
} from "../shared";

/* Classic intentionally overrides the user font with a serif stack — that is
   part of this template's identity. */
const SERIF = "Georgia, 'Times New Roman', serif";

export default function ClassicTemplate({ resume }: TemplateProps) {
  const { accent, data, sections } = resume;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="serif">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[60px] py-[52px]`} style={{ fontFamily: SERIF }}>
      <ResumeHeader resume={resume} variant="classic" />
      {sections.summary && data.summary && (
        <><H>Summary</H><p className="m-0">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="classic" title="Professional Experience" />
      <ProjectsSection resume={resume} H={H} />
      <EducationSection resume={resume} H={H} variant="classic" />
      {sections.skills && data.skills.length > 0 && (
        <><H>Skills</H><div>{data.skills.join(" · ")}</div></>
      )}
      {sections.languages && data.languages.length > 0 && (
        <><H>Languages</H><div>{data.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</div></>
      )}
      <CertificationsSection resume={resume} H={H} variant="inline" />
      <AwardsSection resume={resume} H={H} />
    </div>
  );
}
