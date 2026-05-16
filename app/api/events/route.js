import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req) {
  const body = await req.json();

  console.log("EVENT RECEIVED:", body);

  const { data, error } = await supabase.from("events").insert([
    {
      intent: body.intent,
      priority: body.priority,
      action: body.action,
      message: body.message,
      status: body.status || "processed",
    },
  ]);

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    success: true,
    message: "Event Received",
    data,
  });
}
