import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing N8N_WEBHOOK_URL",
        },
        { status: 500 },
      );
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: body.message,
        source: "nextjs-backend",
        timestamp: new Date().toISOString(),
      }),
    });

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
