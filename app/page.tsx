"use client";
import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider, useAssistantInstructions } from "@assistant-ui/react";
import { ThreadList } from "@/components/assistant-ui/thread-list";

// Create a child component that uses the hook within the provider context
function AssistantContent() {
  useAssistantInstructions({
    instruction: `You are a helpful assistant. Your job is to correct and improve whatever message the user sends.
    The user will send you a message and you have to make sure to correct any mistakes in the message grammar, spelling, punctuation, and capitalization.

    You will also return to the user other versions of the corrected message. You will return a paraphrased version as well as versions with different tones.
    Make sure to only return the correct message with the other versions.
    Refrain from returning any explanations or additional information.
    Make sure to preserve the user's original message as much as possible.
    Make sure to preserve the original message's tone and intent.
    Make sure to preserve the original message's language.
    Make sure to always be simple.

    Example exchange format:
    - User: {user message containing mistakes}
    - Assistant: 
      {corrected message} - **correct**

      {paraphrased message} - **paraphrase**

      {message with different tone 1} - **{tone 1}**

      {message with different tone 2}- **{tone 2}**

      {improved message making it more clear} - **improved**

      {simpler and concise message} - **simple**
     ...
    `,
  });

  return (
    <Thread />
  );
}

export default function Home() {
  const runtime = useChatRuntime({ 
    api: "/api/chat" 
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="min-h-dvh bg-gradient-to-b from-pink-100 to-pink-200">
        <main className="h-dvh grid gap-x-2 px-4 py-4">
          <AssistantContent />
        </main>
      </div>
    </AssistantRuntimeProvider>
  );
}
