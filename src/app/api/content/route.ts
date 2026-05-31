import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load portfolio content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await saveContent(data);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save portfolio";
    console.error(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
