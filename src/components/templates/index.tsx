/* Barrel for the template system. Import surface:
 *   templates / getTemplate / TEMPLATE_MAP  → registry
 *   Resume / TemplateProps / TemplateDefinition → contract types
 */
export { templates, getTemplate, TEMPLATE_MAP } from "./registry";
export { default as OptionalExtras } from "./OptionalExtras";
export type { Resume, TemplateProps, TemplateDefinition } from "./types";
