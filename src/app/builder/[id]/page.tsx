import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ResumeRow } from "@/lib/types";
import BuilderShell from "@/components/builder/BuilderShell";

export const dynamic = "force-dynamic";

export default async function BuilderPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/builder/${params.id}`);

  const { data: resume } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!resume) notFound();

  return <BuilderShell initial={resume as ResumeRow} />;
}
