# Plug-and-play AI Event Automation System

A configurable AI automation framework that plugs into your stack. Clone it, set your environment variables, connect Supabase + n8n, and you get a real-time AI event dashboard with workflow automation.

## Overview

This system turns unstructured input into structured AI events, triggers workflows, stores results in Supabase, and streams updates to the dashboard.

## System workflow

- Receive an external event (API, webhook, or UI)
- Forward to workflow automation engine
- Classify via AI model (intent, priority, action)
- Store event in Supabase
- Stream updates to the dashboard

## Features

- AI-based event classification (intent, priority, action)
- n8n workflow orchestration
- Real-time dashboard updates via Supabase
- Priority-based event filtering
- API-driven event ingestion

## Tech stack

- Next.js (App Router)
- React 19
- Supabase (database + realtime)
- n8n (workflow automation)
- LLM providers (OpenRouter or compatible APIs)

## Setup instructions

### 1. Clone the project

```bash
git clone <repo-url>
cd ai-automation-os
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file using [.env.example](.env.example) as a template.

```bash
cp .env.example .env.local
```

You must configure:

- AI provider and model (OpenRouter or other LLM provider)
- Supabase project credentials
- n8n webhook URL

### 4. Supported AI models

Use any model supported by your provider. Example models:

- openai/gpt-4o-mini
- anthropic/claude-3-haiku
- baidu/cobuddy-20260430:free
- meta-llama models (if supported)

### 5. Supabase setup

Create the `events` table:

```sql
create table events (
	id uuid primary key default gen_random_uuid(),
	intent text,
	priority text,
	action text,
	message text,
	status text,
	created_at timestamp default now()
);
```

### 6. Run the project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The client uses public variables prefixed with `NEXT_PUBLIC_`. The server uses private variables that should never be exposed to the browser.

```env
# AI PROVIDER
AI_PROVIDER=openrouter
AI_MODEL=baidu/cobuddy-20260430:free
AI_API_KEY=your_ai_api_key_here

# SUPABASE (server)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# SUPABASE (client)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# N8N WORKFLOW
N8N_WEBHOOK_URL=https://your-n8n-url/webhook/ai-process

# APP CONFIG
APP_NAME=AI Event Automation System
```

## Example event output

```json
{
	"intent": "refund_request",
	"priority": "high",
	"action": "process_refund",
	"message": "Customer wants refund urgently"
}
```

## Use cases

- Customer support automation and ticket classification
- Refund and complaint handling systems
- Business event monitoring dashboards
- AI-powered operational workflows
- Automated decision-making pipelines

## Notes

- `SUPABASE_SERVICE_ROLE_KEY` is for server-side use only. Never expose it in the browser.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe for client usage.
