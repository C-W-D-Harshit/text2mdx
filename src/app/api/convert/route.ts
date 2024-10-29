import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";
import { PrismaClient } from "@prisma/client";
import NodeCache from "node-cache";

const prisma = new PrismaClient();
const cache = new NodeCache();
const CHARACTER_LIMIT = Number(process.env.NEXT_PUBLIC_CHARACTER_LIMIT) || 3500;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing text in the request body" },
        { status: 400 }
      );
    }

    // Implement character limit check
    if (text.length > CHARACTER_LIMIT) {
      return NextResponse.json(
        {
          error: `The text exceeds the character limit of ${CHARACTER_LIMIT}.`,
        },
        { status: 400 }
      );
    }

    // Implement caching of system messages using Node Cache
    const cacheKey = "systemMessages";
    const textCacheKey = `text:${text}`;
    const cachedMDX = cache.get(textCacheKey);

    if (cachedMDX) {
      console.log("Returning cached MDX content");
      return NextResponse.json({ mdxContent: cachedMDX });
    }

    let systemMessages: { role: "system" | "user"; content: string }[] | null =
      null;

    // Try to get cached system messages
    systemMessages = cache.get(cacheKey) || null;

    if (!systemMessages) {
      console.log("Fetching system messages from the database");
      // Fetch system messages from the database
      const systemMessagesData = await prisma.systemMessage.findMany();

      // Add role to each message
      systemMessages = systemMessagesData.map((message) => ({
        content: message.content,
        role: "system",
      }));

      // Cache the system messages
      cache.set(cacheKey, systemMessages);
    } else {
      console.log("Fetching system messages from the cache");
    }

    // Then convert text to MDX
    const openaiResponse = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      // model: "google/gemma-2-9b-it:free",
      messages: [
        ...systemMessages,
        {
          role: "user",
          content: `This is the text that we have to convert: ${text}`,
        },
      ],
    });

    const mdxContent = openaiResponse.choices[0].message.content;
    cache.set(textCacheKey, mdxContent);
    return NextResponse.json({ mdxContent });
  } catch (error) {
    console.error("Error in convert-to-mdx API:", error);
    return NextResponse.json(
      { error: "Failed to convert text to MDX." },
      { status: 500 }
    );
  }
}
