import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk } from "../tokens";
import {
  ExperienceSection, EducationSection, SkillsSection,
  CertificationsSection, ProjectsSection, AwardsSection,
  HeadingComponent,
} from "../shared";

/* European — modern Europass-inspired CV: photo and personal details are
   customary, a label rail on the left echoes Europass's field/value layout,
   and languages get their own prominent block (CEFR culture). */
export default function EuropeanTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;

  const H: HeadingComponent = ({ children }) => (
    <div className="mb-2.5 mt-6 grid grid-cols-[150px_1fr] items-center gap-6">
      <div className="text-right text-[11.5px] font-bold uppercase tracking-[1.5px]" style={{ color: accent }}>
        {children}
      </div>
      <div className="h-px bg-slate-200" />
    </div>
  );
  const Row = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-[150px_1fr] gap-6">
      <div />
      <div>{children}</div>
    </div>
  );

  return (
    <div className={`${tk.page} px-12 py-11`} style={{ fontFamily: font }}>
      {/* header with photo + personal information block */}
      <div className="grid grid-cols-[150px_1fr] items-start gap-6 border-b-2 pb-5" style={{ borderColor: accent }}>
        <div className="flex justify-end">
          {p.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.photo} alt="" className="h-[110px] w-[92px] rounded object-cover" />
          )}
        </div>
        <div>
          <h1 className="text-[27px] font-bold tracking-tight leading-tight text-slate-900">{fullName(p)}</h1>
          <div className="mt-0.5 text-[13.5px] font-semibold" style={{ color: accent }}>{p.title}</div>
          <div className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-[11px]">
            {[
              ["Email", p.email], ["Phone", p.phone], ["Address", p.location],
              ["LinkedIn", p.linkedin], ["Web", p.website],
            ].filter(([, v]) => v).map(([k, v]) => (
              <span key={k as string} className="contents">
                <span className="font-semibold text-slate-500">{k}</span>
                <span className="text-slate-700">{v}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {sections.summary && data.summary && (
        <><H>Profile</H><Row><p className="m-0">{data.summary}</p></Row></>
      )}
      {sections.experience && data.experience.length > 0 && (
        <>
          <H>Work Experience</H>
          <Row><ExperienceSection resume={resume} H={() => null} variant="modern" title="" /></Row>
        </>
      )}
      {sections.education && data.education.length > 0 && (
        <>
          <H>Education & Training</H>
          <Row><EducationSection resume={resume} H={() => null} variant="modern" title="" /></Row>
        </>
      )}
      {sections.languages && data.languages.length > 0 && (
        <>
          <H>Language Skills</H>
          <Row>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {data.languages.map((l, i) => (
                <div key={i} className="flex justify-between border-b border-slate-100 pb-1 text-[12px]">
                  <span className="font-semibold">{l.name}</span>
                  <span className="text-slate-500">{l.level}</span>
                </div>
              ))}
            </div>
          </Row>
        </>
      )}
      {sections.skills && data.skills.length > 0 && (
        <>
          <H>Skills</H>
          <Row><SkillsSection resume={resume} H={() => null} variant="pills" title="" /></Row>
        </>
      )}
      {(data.certifications.length > 0 || (data.projects ?? []).length > 0 || (data.awards ?? []).length > 0) && (
        <>
          <H>Additional Information</H>
          <Row>
            <CertificationsSection resume={resume} H={() => null} variant="inline" title="" />
            <ProjectsSection resume={resume} H={() => null} title="" />
            <AwardsSection resume={resume} H={() => null} title="" />
          </Row>
        </>
      )}
    </div>
  );
}
