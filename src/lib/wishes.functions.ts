import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  name: z.string().min(1).max(60).optional(),
  vibe: z.enum(["heartfelt", "poetic", "playful", "spiritual"]).default("heartfelt"),
});

export const generateWish = createServerFn({ method: "POST" })
  .inputValidator((data) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("AI gateway is not configured");
    }

    const name = data.name?.trim() || "Mom";
    const vibePrompt: Record<string, string> = {
      heartfelt: "warm, sincere, and deeply loving",
      poetic: "lyrical, elegant, like a short poem with imagery of flowers, light, and the seasons",
      playful: "joyful, light, with a touch of gentle humor",
      spiritual: "grateful, peaceful, with imagery of light, blessings, and grace",
    };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You write short, beautiful birthday wishes from a child to their mother. 3-5 sentences. No emojis. No greetings like 'Dear'. Start the message itself.",
          },
          {
            role: "user",
            content: `Write a ${vibePrompt[data.vibe]} birthday wish for my mother named ${name}. Make it feel uniquely hers, mention her warmth, light, or strength. Avoid clichés like 'another year older'.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { wish: content };
  });
