import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  askFeepostSystemPrompt,
  sanitizeAssistantMessages
} from "@/lib/feepost-assistant";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Ask Feepost is not configured yet. Add OPENAI_API_KEY on the server to enable the assistant."
      },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { messages?: unknown }
    | null;
  const messages = sanitizeAssistantMessages(body?.messages);

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "Send at least one user message to Ask Feepost." },
      { status: 400 }
    );
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "developer",
          content: askFeepostSystemPrompt
        },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content
        }))
      ],
      max_output_tokens: 320
    });

    const answer = response.output_text.trim();

    return NextResponse.json({
      message:
        answer ||
        "Feepost can help with software engineering, infrastructure modernization, and government-ready delivery planning. Contact contact@feepostsoftware.com for a direct capability discussion."
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The assistant could not complete this request.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
