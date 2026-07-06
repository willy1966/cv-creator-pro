"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field({
  label, hint, className = "", ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-semibold text-ink">{label}</span>
      <input
        {...props}
        className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function Area({
  label, hint, className = "", ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-semibold text-ink">{label}</span>
      <textarea
        {...props}
        className="resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

const btnKinds = {
  primary: "bg-primary text-white shadow-[0_4px_14px_rgba(37,99,235,.28)] hover:bg-blue-700",
  ghost: "border border-slate-200 bg-white text-ink hover:bg-slate-50",
  dark: "bg-navy text-white hover:bg-slate-800",
  accent: "bg-accent text-white shadow-[0_4px_14px_rgba(16,185,129,.28)] hover:bg-emerald-600",
  danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
} as const;

export function Btn({
  kind = "primary", small = false, className = "", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: keyof typeof btnKinds; small?: boolean;
}) {
  return (
    <button
      type="button"
      {...props}
      className={`rounded-xl font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 ${
        small ? "px-3.5 py-2 text-[13px]" : "px-5 py-2.5 text-[15px]"
      } ${btnKinds[kind]} ${className}`}
    />
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center bg-gradient-to-br from-primary to-accent font-extrabold text-white"
      style={{ width: size, height: size, borderRadius: size * 0.3, fontSize: size * 0.5 }}
    >
      C
    </div>
  );
}
