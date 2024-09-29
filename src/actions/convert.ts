"use server";

import openai from "@/lib/openai";
import { PrismaClient } from "@prisma/client";
import NodeCache from "node-cache";

const prisma = new PrismaClient();
const cache = new NodeCache();

export async function convertTextToMDX({ text }: { text: string }) {
  try {
    // Implement caching of system messages using Node Cache
    const cacheKey = "systemMessages";
    const textCacheKey = `text:${text}`;
    const cachedMDX = cache.get(textCacheKey);

    if (cachedMDX) {
      console.log("Returning cached MDX content");
      return { mdxContent: cachedMDX };
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
    return { mdxContent };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "Failed to convert text to MDX." };
  }
}
