"use client";

/* Template gallery: searchable, filterable grid of template cards with live
   miniature previews (sample data), favorites, recently-used, hover
   animation, a Preview modal, and a "Use template" action. Selecting a
   template only changes the template id — user resume data is never touched. */

import { memo, useEffect, useMemo, useState } from "react";
import {
  TEMPLATE_CATEGORIES, TemplateCategory, TemplateId,
  DEFAULT_SECTIONS, FONT_STACKS,
} from "@/lib/types";
import { SAMPLE_RESUME } from "@/lib/sample-data";
import { templates } from "./registry";
import OptionalExtras from "./OptionalExtras";
import type { Resume, TemplateDefinition } from "./types";
import { PAGE } from "./tokens";

const FAV_KEY = "cvp-fav-templates";
const RECENT_KEY = "cvp-recent-templates";
const RECENT_MAX = 8;

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const v = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Records a template use for the "Recent" filter (most recent first). */
export function recordTemplateUse(id: TemplateId) {
  const next = [id, ...readIds(RECENT_KEY).filter((x) => x !== id)].slice(0, RECENT_MAX);
  try { window.localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* quota */ }
}

const PREVIEW_RESUME = (accent: string): Resume => ({
  data: SAMPLE_RESUME,
  accent,
  font: FONT_STACKS.sans,
  sections: DEFAULT_SECTIONS,
});

/* Miniature (or full-size) render of a template with sample data. Memoized —
   with 55 templates in the grid, re-rendering every page on each keystroke
   of the search box would be very expensive. */
const LivePreview = memo(
  function LivePreview({ tpl, accent, scale }: { tpl: TemplateDefinition; accent: string; scale: number }) {
    const Tpl = tpl.component;
    return (
      <div
        className="pointer-events-none select-none overflow-hidden bg-white"
        style={{ width: PAGE.width * scale, height: PAGE.minHeight * scale }}
        aria-hidden
      >
        <div className="origin-top-left" style={{ transform: `scale(${scale})`, width: PAGE.width }}>
          <Tpl resume={PREVIEW_RESUME(accent)} />
          <OptionalExtras resume={PREVIEW_RESUME(accent)} />
        </div>
      </div>
    );
  },
  (a, b) => a.tpl.id === b.tpl.id && a.accent === b.accent && a.scale === b.scale
);

type Filter = TemplateCategory | "All" | "★ Favorites" | "Recent";

export default function TemplateGallery({
  currentId, accent = "#2563EB", onUse, onClose,
}: {
  currentId?: TemplateId;
  accent?: string;
  onUse: (id: TemplateId) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [previewId, setPreviewId] = useState<TemplateId | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  /* localStorage is client-only — load after mount to avoid hydration issues */
  useEffect(() => {
    setFavorites(readIds(FAV_KEY));
    setRecent(readIds(RECENT_KEY));
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      try { window.localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch { /* quota */ }
      return next;
    });
  };

  const useTemplate = (id: TemplateId) => {
    recordTemplateUse(id);
    onUse(id);
    onClose();
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = templates.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.categories.some((c) => c.toLowerCase().includes(q));
      if (!matchesQuery) return false;
      if (filter === "All") return true;
      if (filter === "★ Favorites") return favorites.includes(t.id);
      if (filter === "Recent") return recent.includes(t.id);
      return t.categories.includes(filter);
    });
    if (filter === "Recent") {
      list = [...list].sort((a, b) => recent.indexOf(a.id) - recent.indexOf(b.id));
    } else {
      /* favorites float to the front everywhere else */
      list = [...list].sort(
        (a, b) => Number(favorites.includes(b.id)) - Number(favorites.includes(a.id))
      );
    }
    return list;
  }, [query, filter, favorites, recent]);

  const previewTpl = previewId ? templates.find((t) => t.id === previewId) : null;
  const chips: Filter[] = ["All", "★ Favorites", "Recent", ...TEMPLATE_CATEGORIES];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 print:hidden" role="dialog" aria-modal="true" aria-label="Template gallery">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* header: title, search, filters */}
        <div className="border-b border-slate-200 px-6 pb-4 pt-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-extrabold text-slate-900">
              Choose a template <span className="ml-1 text-sm font-semibold text-slate-400">{templates.length} designs</span>
            </h2>
            <button type="button" onClick={onClose} aria-label="Close gallery" className="rounded-lg px-2 py-1 text-xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">×</button>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates by name, style, or category…"
            className="mt-3 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  filter === c
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
                {c === "★ Favorites" && favorites.length > 0 && ` (${favorites.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* cards */}
        <div className="min-h-0 flex-1 overflow-auto bg-slate-50 p-6">
          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">
              {filter === "★ Favorites" && !query
                ? "No favorites yet — hover a card and tap the star."
                : filter === "Recent" && !query
                  ? "No recently used templates yet."
                  : `No templates match “${query}”.`}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((t) => (
                <div
                  key={t.id}
                  style={{ contentVisibility: "auto", containIntrinsicSize: "380px" }}
                  className={`group overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                    t.id === currentId ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
                  }`}
                >
                  {/* thumbnail */}
                  <div className="relative flex justify-center overflow-hidden border-b border-slate-100 bg-slate-100 pt-3">
                    {t.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.thumbnail} alt={`${t.name} template`} className="h-[290px] w-auto" />
                    ) : (
                      <LivePreview tpl={t} accent={accent} scale={0.26} />
                    )}
                    {/* favorite star */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(t.id)}
                      aria-label={favorites.includes(t.id) ? `Unfavorite ${t.name}` : `Favorite ${t.name}`}
                      className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[16px] shadow transition hover:scale-110 ${
                        favorites.includes(t.id) ? "text-amber-400" : "text-slate-300 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {favorites.includes(t.id) ? "★" : "☆"}
                    </button>
                    {/* hover overlay with actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slate-900/0 opacity-0 transition-all duration-200 group-hover:bg-slate-900/40 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => setPreviewId(t.id)}
                        className="rounded-lg bg-white px-3.5 py-1.5 text-[13px] font-bold text-slate-800 shadow transition hover:scale-105"
                      >Preview</button>
                      <button
                        type="button"
                        onClick={() => useTemplate(t.id)}
                        className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-bold text-white shadow transition hover:scale-105 hover:bg-blue-700"
                      >Use template</button>
                    </div>
                  </div>
                  {/* meta */}
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-slate-900">{t.name}</span>
                      {t.id === currentId && <span className="text-[11px] font-bold text-blue-600">Current</span>}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{t.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {t.categories.map((c) => (
                        <span key={c} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* full-size preview modal */}
      {previewTpl && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-auto bg-slate-900/70 p-6"
          onClick={() => setPreviewId(null)}
          role="dialog" aria-modal="true" aria-label={`${previewTpl.name} preview`}
        >
          <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow">
              <span className="text-sm font-extrabold text-slate-900">{previewTpl.name}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => useTemplate(previewTpl.id)}
                  className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-bold text-white transition hover:bg-blue-700"
                >Use template</button>
                <button
                  type="button"
                  onClick={() => setPreviewId(null)}
                  className="rounded-lg bg-slate-100 px-3.5 py-1.5 text-[13px] font-bold text-slate-700 transition hover:bg-slate-200"
                >Close</button>
              </div>
            </div>
            <div className="overflow-hidden rounded shadow-2xl">
              <LivePreview tpl={previewTpl} accent={accent} scale={0.72} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
