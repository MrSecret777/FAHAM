"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAdmin(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!email || !password) {
    redirect(`/admin/login?error=${encodeURIComponent("Sila masukkan emel dan kata laluan.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent("Login gagal. Semak emel dan kata laluan.")}`);
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}
