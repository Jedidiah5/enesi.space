import { createClient } from "@supabase/supabase-js";
import type { SiteContent } from "@/types/content";
import { mergeWithDefaults } from "./merge-defaults";

export async function getSiteContent(): Promise<SiteContent> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return mergeWithDefaults(null);
  }
  const supabase = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    return mergeWithDefaults(null);
  }
  if (!data?.data) {
    return mergeWithDefaults(null);
  }
  return mergeWithDefaults(data.data);
}
