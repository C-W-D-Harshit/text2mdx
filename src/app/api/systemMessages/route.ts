// pages/api/systemMessages.js

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  // Validate input
  if (!content) {
    return NextResponse.json(
      { error: "Content is required." },
      { status: 400 }
    );
  }

  try {
    const newMessages = await prisma.systemMessage.createMany({
      data: content.map((message: string) => ({ content: message })),
    });
    return NextResponse.json(newMessages, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to create system message." },
      { status: 500 }
    );
  }
}
