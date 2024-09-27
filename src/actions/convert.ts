"use server";

import openai from "@/lib/openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function convertTextToMDX({ text }: { text: string }) {
  try {
    // first fetch system messages
    const systemMessagesData = await prisma.systemMessage.findMany();

    // add role to each message
    const systemMessages: {
      role: "system" | "user";
      content: string;
    }[] = systemMessagesData.map((message) => ({
      content: message.content,
      role: "system",
    }));

    // then convert text to MDX
    const openaiResponse = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [...systemMessages, { role: "user", content: text }],
    });

    const mdxContent = openaiResponse.choices[0].message.content;
    return { mdxContent };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "Failed to convert text to MDX." };
  }
}

export const maxDuration = 60;
