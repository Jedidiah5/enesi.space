import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin/session";
import type { SiteContent } from "@/types/content";
import { getSiteContent } from "@/lib/content/get-content";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

async function assertAdmin() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(secret, token)) return null;
  return true;
}

export async function GET() {
  if (!(await assertAdmin())) return unauthorized();
  const content = await getSiteContent();
  return NextResponse.json({ ok: true, content });
}

export async function PUT(req: Request) {
  if (!(await assertAdmin())) return unauthorized();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable cloud save, or use Export JSON from the admin UI.",
      },
      { status: 503 },
    );
  }
  let content: SiteContent;
  try {
    content = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const supabase = createClient(url, service, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase.from("site_content").upsert(
    {
      id: 1,
      data: content,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
