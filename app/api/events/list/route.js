import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ success: false, error });
  }

  return Response.json({ success: true, data });
}
