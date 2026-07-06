import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

/* Minimal Mono — strict black & white Scandinavian layout. Deliberately
   ignores the user's accent color: monochrome is the template's identity.
   Large whitespace, thin type, hairline dividers. */
export default function MinimalMonoTemplate({ resume }: TemplateProps) {
  const { font, data, sections } = resume;
  const p = data.personal;
  const H: HeadingComponent = ({ children }) => (
    <SectionHeading accent="#0F172A" variant="spaced">{children}</SectionHeading>
  );

  return (
    <div className={`${tk.page} px-[72px] py-[68px] leading-[1.7] text-slate-900`} style={{ fontFamily: font }}>
      {/* oversized light masthead */}
      <div className="pb-8">
        <div className="text-[38px] font-extralight tracking-tight leading-[1.1]">{fullName(p)}</div>
        <div className="mt-2 text-[13px] font-normal uppercase tracking-[4px] text-slate-500">{p.title}</div>
        <div className="mt-5 border-t border-slate-900 pt-3 text-[11px] tracking-wide text-slate-500">
          {contactBits(p).join("   /   ")}
        </div>
      </div>

      {sections.summary && data.summary && (
        <><H>About</H><p className="m-0 max-w-[540px]">{data.summary}</p></>
      )}
      <ExperienceSection resume={resume} H={H} variant="plain" />
      <ProjectsSection resume={resume} H={H} />
      <EducationSection resume={resume} H={H} variant="compact" />
      <div className="grid grid-cols-2 gap-10">
        <div>
          {sections.skills && data.skills.length > 0 && (
            <><H>Skills</H><div className="text-slate-700">{data.skills.join(", ")}</div></>
          )}
        </div>
        <div><LanguagesSection resume={resume} H={H} variant="rows" /></div>
      </div>
      <CertificationsSection resume={resume} H={H} variant="inline" />
      <AwardsSection resume={resume} H={H} />
    </div>
  );
}
