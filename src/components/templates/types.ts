import type { ComponentType } from "react";
import type {
  ResumeData, SectionVisibility, TemplateId, TemplateCategory,
} from "@/lib/types";

/* The single object every template receives. Templates are pure functions of
   this object — they never own or mutate resume state, so switching templates
   can never change user data. */
export interface Resume {
  data: ResumeData;
  accent: string;        // user-picked hex — the ONE dynamic style value
  font: string;          // resolved font stack (FONT_STACKS[fontId])
  sections: SectionVisibility;
}

export interface TemplateProps {
  resume: Resume;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  categories: TemplateCategory[];
  /** Optional static thumbnail URL; the gallery falls back to a live
      miniature render with sample data when empty. */
  thumbnail: string;
  component: ComponentType<TemplateProps>;
}
