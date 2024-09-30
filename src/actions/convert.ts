"use server";

import openai from "@/lib/openai";
import { PrismaClient } from "@prisma/client";
import NodeCache from "node-cache";

const prisma = new PrismaClient();
const cache = new NodeCache();
const CHARACTER_LIMIT = Number(process.env.NEXT_PUBLIC_CHARACTER_LIMIT) || 3500;

export async function convertTextToMDX({ text }: { text: string }) {
  try {
    // Implement character limit check
    if (text.length > CHARACTER_LIMIT) {
      return {
        error: `The text exceeds the character limit of ${CHARACTER_LIMIT}.`,
      };
    }

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

export const addConversion = async ({
  ipAddress,
  userAgent,
}: {
  ipAddress: string;
  userAgent: string;
}) => {
  try {
    await prisma.conversion.create({
      data: {
        ipAddress: ipAddress,
        userAgent: userAgent,
      },
    });
  } catch (error: unknown) {
    console.error("Failed to add conversion", error);
  }
};

export const getNumberOfConversions = async () => {
  try {
    const count = await prisma.conversion.count();
    return count;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return 0;
  }
};
