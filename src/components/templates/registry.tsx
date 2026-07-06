/* Template registry — the single place a template must be registered.
 *
 * To add a template:
 *   1. Create src/components/templates/<Name>/index.tsx exporting a default
 *      component with signature ({ resume }: TemplateProps) => JSX.Element.
 *   2. Add its id to TemplateId and its metadata to TEMPLATES in lib/types.ts.
 *   3. Add one entry to COMPONENTS below.
 * The builder, gallery, print/PDF pipeline, and dashboard pick it up
 * automatically — nothing else changes.
 */
import { TEMPLATES, TemplateId } from "@/lib/types";
import type { TemplateDefinition, TemplateProps } from "./types";
import type { ComponentType } from "react";

import ModernTemplate from "./Modern";
import SidebarTemplate from "./Sidebar";
import MinimalTemplate from "./Minimal";
import ClassicTemplate from "./Classic";
import ExecutiveTemplate from "./Executive";
import ModernProTemplate from "./ModernPro";
import ExecutiveGoldTemplate from "./ExecutiveGold";
import CorporateTemplate from "./Corporate";
import MinimalMonoTemplate from "./MinimalMono";
import ElegantTemplate from "./Elegant";
import AtsProfessionalTemplate from "./AtsProfessional";
import AtsModernTemplate from "./AtsModern";
import AtsCompactTemplate from "./AtsCompact";
import AtsExecutiveTemplate from "./AtsExecutive";
import AtsStandardTemplate from "./AtsStandard";
import FreshGraduateTemplate from "./FreshGraduate";
import UniversityStudentTemplate from "./UniversityStudent";
import InternshipTemplate from "./Internship";
import AcademicTemplate from "./Academic";
import EntryLevelTemplate from "./EntryLevel";
import CreativeDesignerTemplate from "./CreativeDesigner";
import UxUiPortfolioTemplate from "./UxUiPortfolio";
import DigitalMarketingTemplate from "./DigitalMarketing";
import PhotographerTemplate from "./Photographer";
import VideoEditorTemplate from "./VideoEditor";
import SoftwareEngineerTemplate from "./SoftwareEngineer";
import FullStackTemplate from "./FullStack";
import DevOpsTemplate from "./DevOps";
import DataScientistTemplate from "./DataScientist";
import CybersecurityTemplate from "./Cybersecurity";
import DoctorTemplate from "./Doctor";
import NurseTemplate from "./Nurse";
import PharmacistTemplate from "./Pharmacist";
import DentistTemplate from "./Dentist";
import MedicalTechTemplate from "./MedicalTech";
import TeacherTemplate from "./Teacher";
import ProfessorTemplate from "./Professor";
import LecturerTemplate from "./Lecturer";
import SchoolAdminTemplate from "./SchoolAdmin";
import ResearcherTemplate from "./Researcher";
import AccountantTemplate from "./Accountant";
import FinancialAnalystTemplate from "./FinancialAnalyst";
import ProjectManagerTemplate from "./ProjectManager";
import SalesExecutiveTemplate from "./SalesExecutive";
import HrManagerTemplate from "./HrManager";
import EuropeanTemplate from "./European";
import UkProfessionalTemplate from "./UkProfessional";
import AustralianTemplate from "./Australian";
import CanadianTemplate from "./Canadian";
import AmericanTemplate from "./American";
import PrestigeTemplate from "./Prestige";
import PlatinumTemplate from "./Platinum";
import SignatureTemplate from "./Signature";
import InfinityTemplate from "./Infinity";
import EliteTemplate from "./Elite";

const COMPONENTS: Record<TemplateId, ComponentType<TemplateProps>> = {
  modern: ModernTemplate,
  sidebar: SidebarTemplate,
  minimal: MinimalTemplate,
  classic: ClassicTemplate,
  executive: ExecutiveTemplate,
  "modern-pro": ModernProTemplate,
  "executive-gold": ExecutiveGoldTemplate,
  corporate: CorporateTemplate,
  "minimal-mono": MinimalMonoTemplate,
  elegant: ElegantTemplate,
  "ats-professional": AtsProfessionalTemplate,
  "ats-modern": AtsModernTemplate,
  "ats-compact": AtsCompactTemplate,
  "ats-executive": AtsExecutiveTemplate,
  "ats-standard": AtsStandardTemplate,
  "fresh-graduate": FreshGraduateTemplate,
  "university-student": UniversityStudentTemplate,
  internship: InternshipTemplate,
  academic: AcademicTemplate,
  "entry-level": EntryLevelTemplate,
  "creative-designer": CreativeDesignerTemplate,
  "uxui-portfolio": UxUiPortfolioTemplate,
  "digital-marketing": DigitalMarketingTemplate,
  photographer: PhotographerTemplate,
  "video-editor": VideoEditorTemplate,
  "software-engineer": SoftwareEngineerTemplate,
  "full-stack": FullStackTemplate,
  devops: DevOpsTemplate,
  "data-scientist": DataScientistTemplate,
  cybersecurity: CybersecurityTemplate,
  doctor: DoctorTemplate,
  nurse: NurseTemplate,
  pharmacist: PharmacistTemplate,
  dentist: DentistTemplate,
  "medical-tech": MedicalTechTemplate,
  teacher: TeacherTemplate,
  professor: ProfessorTemplate,
  lecturer: LecturerTemplate,
  "school-admin": SchoolAdminTemplate,
  researcher: ResearcherTemplate,
  accountant: AccountantTemplate,
  "financial-analyst": FinancialAnalystTemplate,
  "project-manager": ProjectManagerTemplate,
  "sales-executive": SalesExecutiveTemplate,
  "hr-manager": HrManagerTemplate,
  european: EuropeanTemplate,
  "uk-professional": UkProfessionalTemplate,
  australian: AustralianTemplate,
  canadian: CanadianTemplate,
  american: AmericanTemplate,
  prestige: PrestigeTemplate,
  platinum: PlatinumTemplate,
  signature: SignatureTemplate,
  infinity: InfinityTemplate,
  elite: EliteTemplate,
};

export const templates: TemplateDefinition[] = TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.desc,
  categories: t.categories,
  thumbnail: "", // gallery live-renders a miniature with sample data
  component: COMPONENTS[t.id],
}));

export function getTemplate(id: string): TemplateDefinition {
  return templates.find((t) => t.id === id) ?? templates[0];
}

/** Back-compat map used by the builder's render path. */
export const TEMPLATE_MAP: Record<TemplateId, ComponentType<TemplateProps>> = COMPONENTS;
