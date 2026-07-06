import { fullName } from "@/lib/types";
import type { TemplateProps } from "../types";
import { tk, PAGE } from "../tokens";
import {
  SectionHeading, ExperienceSection, EducationSection, SkillsSection,
  LanguagesSection, CertificationsSection, ProjectsSection, AwardsSection,
  contactBits, HeadingComponent,
} from "../shared";

export default function SidebarTemplate({ resume }: TemplateProps) {
  const { accent, font, data, sections } = resume;
  const p = data.personal;
  const initials = `${(p.firstName || "Y")[0] || ""}${(p.lastName || "N")[0] || ""}`.toUpperCase();

  const SideH: HeadingComponent = ({ children }) => (
    <div className="mb-2 mt-5 text-[11px] font-extrabold uppercase tracking-[2px] text-slate-400">{children}</div>
  );
  const MainH: HeadingComponent = ({ children }) => (
    <SectionHeading accent={accent} variant="underline">{children}</SectionHeading>
  );

  return (
    <div
      className={`${tk.page} grid grid-cols-[250px_1fr]`}
      style={{ fontFamily: font, minHeight: PAGE.minHeight }}
    >
      {/* sidebar */}
      <div className="bg-slate-900 px-[26px] py-10 text-slate-200">
        {p.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt="" className="mb-4 block h-24 w-24 rounded-full border-[3px] object-cover" style={{ borderColor: accent }} />
        ) : (
          <div
            className="mb-4 flex h-[84px] w-[84px] items-center justify-center rounded-full text-[28px] font-extrabold text-white"
            style={{ background: accent }}
          >{initials}</div>
        )}
        <div className="text-[22px] font-extrabold leading-tight text-white">{fullName(p)}</div>
        <div className="mt-1 text-[12px] font-semibold" style={{ color: accent }}>{p.title}</div>

        <SideH>Contact</SideH>
        {contactBits(p).map((c, i) => (
          <div key={i} className="mb-1 break-words text-[11px]">{c}</div>
        ))}

        <SkillsSection resume={resume} H={SideH} variant="dots" />
        <LanguagesSection resume={resume} H={SideH} variant="dark" />
      </div>

      {/* main column */}
      <div className="bg-white px-9 py-10 text-slate-800">
        {sections.summary && data.summary && (
          <><MainH>Profile</MainH><p className="m-0">{data.summary}</p></>
        )}
        <ExperienceSection resume={resume} H={MainH} variant="plain" title="Experience" />
        <ProjectsSection resume={resume} H={MainH} />
        <EducationSection resume={resume} H={MainH} variant="modern" />
        <CertificationsSection resume={resume} H={MainH} variant="inline" />
        <AwardsSection resume={resume} H={MainH} />
      </div>
    </div>
  );
}
