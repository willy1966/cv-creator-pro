/* Design tokens for resume templates.
 *
 * Tailwind utility bundles shared by every template so typography stays
 * consistent across the system. Templates compose these instead of choosing
 * their own sizes. The only style value applied inline is the user's accent
 * color (a runtime hex Tailwind cannot compile) and the selected font stack.
 *
 * All sizes are in px on a fixed 794×1123 (A4 @ 96dpi) page, so the on-screen
 * preview, the print output, and the exported PDF are identical.
 */

export const PAGE = {
  width: 794,
  minHeight: 1123,
} as const;

export const tk = {
  /* page shell */
  page: "bg-white text-slate-800 text-[12.5px] leading-[1.55] break-words",

  /* identity */
  name: "text-[30px] font-extrabold tracking-tight leading-tight",
  role: "text-[14px] font-semibold",

  /* body copy */
  body: "text-[12.5px] leading-[1.55]",
  small: "text-[11.5px]",
  meta: "text-[11px] text-slate-500",
  muted: "text-slate-500",

  /* section internals */
  itemTitle: "text-[13.5px] font-bold",
  itemSub: "text-[12px] font-semibold",
  bullets: "mt-1.5 list-disc pl-4",
  bullet: "mb-0.5",

  /* section headings (variants live in shared/SectionHeading) */
  headingText: "text-[13px] font-extrabold uppercase tracking-[2px]",
} as const;

/** Translucent tints of the accent color (hex + alpha nibble). */
export const tint = {
  soft: (accent: string) => `${accent}14`,
  line: (accent: string) => `${accent}22`,
  border: (accent: string) => `${accent}55`,
};
