import { groq } from "@ai-sdk/groq";
import { jsonSchema, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();
  console.log({ messages, system, tools });

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages,
    system,
    tools: Object.fromEntries(
      Object.keys(tools).map((name) => [
        name,
        { ...tools[name], parameters: jsonSchema(tools[name].parameters) },
      ])
    ),
  });

  return result.toDataStreamResponse();
}
