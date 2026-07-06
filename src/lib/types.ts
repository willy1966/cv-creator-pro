export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  photo: string; // public URL (Supabase Storage) or data URL
}

export interface Language {
  name: string;
  level: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  bullets: string; // one bullet per line
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  gpa: string;
}

export interface Certification {
  name: string;
  year: string;
}

/* Optional sections — not yet editable in the builder, but templates and
   shared section components already support them. */
export interface Project {
  name: string;
  description: string;
  link: string;
}

export interface Award {
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  skills: string[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects?: Project[];
  awards?: Award[];
}

export type SectionKey =
  | "summary"
  | "skills"
  | "languages"
  | "experience"
  | "education"
  | "certifications";

export type SectionVisibility = Record<SectionKey, boolean>;

export type TemplateId =
  | "modern" | "sidebar" | "minimal" | "classic" | "executive"
  | "modern-pro" | "executive-gold" | "corporate" | "minimal-mono" | "elegant"
  | "ats-professional" | "ats-modern" | "ats-compact" | "ats-executive" | "ats-standard"
  | "fresh-graduate" | "university-student" | "internship" | "academic" | "entry-level"
  | "creative-designer" | "uxui-portfolio" | "digital-marketing" | "photographer" | "video-editor"
  | "software-engineer" | "full-stack" | "devops" | "data-scientist" | "cybersecurity"
  | "doctor" | "nurse" | "pharmacist" | "dentist" | "medical-tech"
  | "teacher" | "professor" | "lecturer" | "school-admin" | "researcher"
  | "accountant" | "financial-analyst" | "project-manager" | "sales-executive" | "hr-manager"
  | "european" | "uk-professional" | "australian" | "canadian" | "american"
  | "prestige" | "platinum" | "signature" | "infinity" | "elite";
export type FontId = "sans" | "serif" | "rounded";

export interface ResumeRow {
  id: string;
  user_id: string;
  title: string;
  template: TemplateId;
  accent: string;
  font: FontId;
  sections: SectionVisibility;
  data: ResumeData;
  created_at: string;
  updated_at: string;
}

export const EMPTY_RESUME: ResumeData = {
  personal: {
    firstName: "", lastName: "", title: "", email: "", phone: "",
    location: "", linkedin: "", website: "", photo: "",
  },
  summary: "",
  skills: [],
  languages: [],
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  awards: [],
};

export const DEFAULT_SECTIONS: SectionVisibility = {
  summary: true, skills: true, languages: true,
  experience: true, education: true, certifications: true,
};

export const FONT_STACKS: Record<FontId, string> = {
  sans: "'Inter', system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  rounded: "'Plus Jakarta Sans', system-ui, sans-serif",
};

export const ACCENT_CHOICES = [
  { name: "Blue", value: "#2563EB" },
  { name: "Emerald", value: "#10B981" },
  { name: "Navy", value: "#0F172A" },
  { name: "Violet", value: "#7C3AED" },
  { name: "Rose", value: "#E11D48" },
  { name: "Amber", value: "#D97706" },
];

export type TemplateCategory =
  | "ATS Friendly"
  | "Modern"
  | "Creative"
  | "Professional"
  | "Minimal"
  | "Executive"
  | "Student";

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "ATS Friendly", "Modern", "Creative", "Professional", "Minimal", "Executive", "Student",
];

/* Pure template metadata. Kept here (no React imports) so server code can use
   it; the component registry in components/templates/registry.tsx composes
   this with the actual components — single source of truth, no duplication. */
export const TEMPLATES: { id: TemplateId; name: string; desc: string; categories: TemplateCategory[] }[] = [
  { id: "modern", name: "Modern", desc: "Two-column with accent rail", categories: ["Modern", "ATS Friendly", "Professional"] },
  { id: "sidebar", name: "Sidebar", desc: "Dark sidebar, bold contrast", categories: ["Creative", "Modern"] },
  { id: "minimal", name: "Minimal", desc: "Centered, airy, quiet", categories: ["Minimal", "ATS Friendly", "Student"] },
  { id: "classic", name: "Classic", desc: "Traditional serif layout", categories: ["Professional", "ATS Friendly"] },
  { id: "executive", name: "Executive", desc: "Strong header band", categories: ["Executive", "Professional"] },
  { id: "modern-pro", name: "Modern Professional", desc: "Two-column header, clean and ATS-safe", categories: ["Modern", "Professional", "ATS Friendly"] },
  { id: "executive-gold", name: "Executive Gold", desc: "Luxury serif headings, gold accents", categories: ["Executive", "Professional"] },
  { id: "corporate", name: "Corporate", desc: "Traditional business layout, HR friendly", categories: ["Professional", "ATS Friendly"] },
  { id: "minimal-mono", name: "Minimal Mono", desc: "Black & white, Scandinavian whitespace", categories: ["Minimal", "ATS Friendly", "Student"] },
  { id: "elegant", name: "Elegant", desc: "Refined typography, soft gray dividers", categories: ["Creative", "Minimal", "Professional"] },
  { id: "ats-professional", name: "ATS Professional", desc: "Single column, underlined headings, parser-safe", categories: ["ATS Friendly", "Professional"] },
  { id: "ats-modern", name: "ATS Modern", desc: "Clean sans, subtle accent headings, no graphics", categories: ["ATS Friendly", "Modern"] },
  { id: "ats-compact", name: "ATS Compact", desc: "Dense one-page layout for longer histories", categories: ["ATS Friendly", "Professional"] },
  { id: "ats-executive", name: "ATS Executive", desc: "Serif, centered masthead, senior-level tone", categories: ["ATS Friendly", "Executive"] },
  { id: "ats-standard", name: "ATS Standard", desc: "Plainest possible — reads like a clean Word doc", categories: ["ATS Friendly", "Student", "Professional"] },
  { id: "fresh-graduate", name: "Fresh Graduate", desc: "Education-first with bold accent energy", categories: ["Student", "Modern", "ATS Friendly"] },
  { id: "university-student", name: "University Student", desc: "Friendly accent band, projects up front", categories: ["Student", "Creative", "ATS Friendly"] },
  { id: "internship", name: "Internship", desc: "Objective-led, compact, skills-forward", categories: ["Student", "ATS Friendly", "Minimal"] },
  { id: "academic", name: "Academic", desc: "Formal serif CV for research and academia", categories: ["Student", "Professional", "ATS Friendly"] },
  { id: "entry-level", name: "Entry Level Professional", desc: "Clean first-job layout with confident headings", categories: ["Student", "Professional", "ATS Friendly"] },
  { id: "creative-designer", name: "Creative Designer", desc: "Tinted sidebar, oversized type, big photo", categories: ["Creative", "Modern"] },
  { id: "uxui-portfolio", name: "UX/UI Portfolio", desc: "Grid layout, geometric accents, work-first", categories: ["Creative", "Modern"] },
  { id: "digital-marketing", name: "Digital Marketing", desc: "Gradient header band, bold energetic type", categories: ["Creative", "Modern", "Professional"] },
  { id: "photographer", name: "Photographer", desc: "Dark hero with centered portrait, gallery-quiet body", categories: ["Creative", "Minimal"] },
  { id: "video-editor", name: "Video Editor", desc: "Dark timeline sidebar, condensed caps", categories: ["Creative", "Modern"] },
  { id: "software-engineer", name: "Software Engineer", desc: "Clean dev layout, mono accents, links up top", categories: ["Modern", "Professional", "ATS Friendly"] },
  { id: "full-stack", name: "Full Stack Developer", desc: "Comment-style headings, tech-stack side rail", categories: ["Modern", "Creative", "Professional"] },
  { id: "devops", name: "DevOps Engineer", desc: "Terminal-window header, prompt headings", categories: ["Modern", "Creative"] },
  { id: "data-scientist", name: "Data Scientist", desc: "Analytical, thin rules, skills matrix feel", categories: ["Modern", "Professional", "ATS Friendly"] },
  { id: "cybersecurity", name: "Cybersecurity Specialist", desc: "Dark ops sidebar, bracketed mono headings", categories: ["Modern", "Creative", "Professional"] },
  { id: "doctor", name: "Doctor", desc: "Dignified serif, licenses front and center", categories: ["Professional", "ATS Friendly", "Executive"] },
  { id: "nurse", name: "Nurse", desc: "Warm clean layout, credentials up top", categories: ["Professional", "ATS Friendly"] },
  { id: "pharmacist", name: "Pharmacist", desc: "Precise banded headings, credential-first", categories: ["Professional", "ATS Friendly"] },
  { id: "dentist", name: "Dentist", desc: "Soft modern lines, practice-ready", categories: ["Professional", "ATS Friendly", "Modern"] },
  { id: "medical-tech", name: "Medical Technician", desc: "Compact technical layout, skills and certs forward", categories: ["Professional", "ATS Friendly", "Student"] },
  { id: "teacher", name: "Teacher", desc: "Warm apple-clean layout, teaching first", categories: ["Professional", "ATS Friendly"] },
  { id: "professor", name: "University Professor", desc: "Formal academic CV, publications prominent", categories: ["Professional", "Executive", "ATS Friendly"] },
  { id: "lecturer", name: "Lecturer", desc: "Modern academic, balanced teaching & research", categories: ["Professional", "Modern", "ATS Friendly"] },
  { id: "school-admin", name: "School Administrator", desc: "Leadership-toned, structured and formal", categories: ["Professional", "Executive", "ATS Friendly"] },
  { id: "researcher", name: "Researcher", desc: "Research-first CV with conference emphasis", categories: ["Professional", "Student", "ATS Friendly"] },
  { id: "accountant", name: "Accountant", desc: "Precise ledger-clean lines, credentials early", categories: ["Professional", "ATS Friendly"] },
  { id: "financial-analyst", name: "Financial Analyst", desc: "Sharp analytical layout, confident rules", categories: ["Professional", "Modern", "ATS Friendly"] },
  { id: "project-manager", name: "Project Manager", desc: "Structured delivery-focused layout", categories: ["Professional", "Modern", "ATS Friendly"] },
  { id: "sales-executive", name: "Sales Executive", desc: "Bold results-first corporate energy", categories: ["Professional", "Executive", "ATS Friendly"] },
  { id: "hr-manager", name: "HR Manager", desc: "Warm polished people-leadership layout", categories: ["Professional", "ATS Friendly"] },
  { id: "european", name: "European", desc: "Modern Europass-style label rail, photo & languages", categories: ["Professional", "Modern"] },
  { id: "uk-professional", name: "UK Professional", desc: "Conservative British CV, profile-led, no photo", categories: ["Professional", "ATS Friendly"] },
  { id: "australian", name: "Australian Professional", desc: "Relaxed-clean AU resume, referees note", categories: ["Professional", "ATS Friendly"] },
  { id: "canadian", name: "Canadian Professional", desc: "Bilingual-friendly, qualifications summary first", categories: ["Professional", "ATS Friendly"] },
  { id: "american", name: "American Professional", desc: "Classic one-page US resume, tight and direct", categories: ["Professional", "ATS Friendly"] },
  { id: "prestige", name: "Prestige", desc: "Editorial luxury — monogram, charcoal band, asymmetric grid", categories: ["Executive", "Professional", "Modern"] },
  { id: "platinum", name: "Platinum", desc: "Cool minimal luxe — silver panel, featherweight type", categories: ["Minimal", "Executive", "Modern"] },
  { id: "signature", name: "Signature", desc: "Personal-brand serif italics with a signature stroke", categories: ["Creative", "Professional", "Minimal"] },
  { id: "infinity", name: "Infinity", desc: "Gradient edge rail with a continuous career timeline", categories: ["Modern", "Creative", "Professional"] },
  { id: "elite", name: "Elite", desc: "Bold black masthead, commanding executive grid", categories: ["Executive", "Modern"] },
];

/* ---------- helpers shared by templates ---------- */

export function splitBullets(text: string): string[] {
  return (text || "").split("\n").map((s) => s.trim()).filter(Boolean);
}

export function fullName(p: PersonalInfo): string {
  return `${p.firstName || "Your"} ${p.lastName || "Name"}`.trim();
}

export function contactBits(p: PersonalInfo): string[] {
  return [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);
}

export function dateRange(e: { start: string; end: string; current: boolean }): string {
  return `${e.start || ""}${e.start || e.end || e.current ? " — " : ""}${e.current ? "Present" : e.end || ""}`;
}
