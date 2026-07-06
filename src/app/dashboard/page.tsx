import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ResumeRow } from "@/lib/types";
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <DashboardClient
      initialResumes={(resumes as ResumeRow[]) ?? []}
      userEmail={user.email ?? ""}
    />
  );
}
