import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const n8nResponse = await fetch(
      "https://psyco.app.n8n.cloud/webhook/ai-process",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: body.message,
          source: "nextjs-backend",
          timestamp: new Date().toISOString(),
        }),
      },
    );

    const data = await n8nResponse.json();

    return NextResponse.json({
      success: true,
      forwarded: true,
      n8n: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
