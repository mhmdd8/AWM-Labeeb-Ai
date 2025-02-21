"use client";

import { useChat } from "@ai-sdk/react";
import { memo, useCallback } from "react";
import {
  ChatInput,
  ChatInputSubmit,
  ChatInputTextArea,
} from "@/components/ui/chat-input";
import {
  ChatMessage,
  ChatMessageAvatar,
  ChatMessageContent,
} from "@/components/ui/chat-message";
import { ChatMessageArea } from "@/components/ui/chat-message-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, GlassWater, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconLogo } from "@/components/ui/icon-logo";
import {
  CloudSun,
  BarChart2,
  LineChart,
  DatabaseBackup,
  Brain,
} from "lucide-react";
import { ToolRenderer } from "@/components/ai/tool-renderer";

type ToolInvocation = {
  toolCallId: string;
  [key: string]: any;
};

const SUGGESTED_PROMPTS = [
  {
    text: "Tell me about Qatar's National Vision 2030",
    icon: Brain,
    category: "",
  },
  {
    text: "Show me Qatar's water consumption data for 2023.",
    icon: GlassWater,
    category: "npc",
  },
  // handle those tasks to show actual statistcs
  // {
  //   text: "Show me statistics about Qatar's population",
  //   icon: BarChart2,
  //   category: "npc",
  // },
  {
    text: "What's the weather like in Doha?",
    icon: CloudSun,
    category: "weather",
  },
  // {
  //   text: "Show me Qatar's economic statistics",
  //   icon: LineChart,
  //   category: "npc",
  // },
] as const;

type SuggestedPromptsProps = {
  onPromptClick: (text: string) => void;
};

const SuggestedPrompts = memo(({ onPromptClick }: SuggestedPromptsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-1 gap-2 w-full max-w-md">
    {SUGGESTED_PROMPTS.map((prompt) => (
      <Button
        key={prompt.text}
        variant={prompt.category ? "secondary" : "outline"}
        className={`text-left flex items-center gap-2 ${
          prompt.category === "npc"
            ? "bg-blue-100 hover:bg-blue-200"
            : prompt.category === "weather"
            ? "bg-yellow-100 hover:bg-yellow-200"
            : ""
        }`}
        onClick={() => onPromptClick(prompt.text)}
      >
        <prompt.icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{prompt.text}</span>
      </Button>
    ))}
  </div>
));
SuggestedPrompts.displayName = "SuggestedPrompts";

const ChatMessages = memo(
  ({ messages, status }: { messages: any[]; status: string }) => (
    <>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          id={message.id}
          type={message.role === "user" ? "outgoing" : "incoming"}
          variant="bubble"
        >
          {message.role === "assistant" && (
            <ChatMessageAvatar className="motion-preset-slide-up" />
          )}
          <ChatMessageContent content={message.content}>
            <>
              {message.toolInvocations?.map(
                (toolInvocation: ToolInvocation) => (
                  <ToolRenderer
                    key={toolInvocation.toolCallId}
                    // @ts-ignore
                    toolInvocation={toolInvocation}
                  />
                )
              )}
            </>
          </ChatMessageContent>
          {message.role === "user" && (
            <ChatMessageAvatar className="motion-preset-slide-up" />
          )}
        </ChatMessage>
      ))}
      {status == "submitted" && (
        <div className="flex items-center justify-start space-x-2">
          {/* <XIcon className="h-3 w-3 animate-spin text-primary" /> */}
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />{" "}
          <div className="text-xs text-primary">AI is thinking...</div>
        </div>
      )}
      {status == "error" && (
        <div className="flex items-center justify-start space-x-2">
          <XIcon className="h-3 w-3 text-red-500" />{" "}
          <div className="text-xs text-red-500">
            An error has occurred, try again!
          </div>
        </div>
      )}
    </>
  )
);
ChatMessages.displayName = "ChatMessages";

export default function ChatBot({ className }: { className?: string }) {
  const {
    messages,
    input,
    append,
    handleInputChange,
    handleSubmit,
    status,
    stop,
  } = useChat({});

  const handlePromptClick = useCallback(
    (text: string) => {
      append({
        role: "user",
        content: text,
      });
    },
    [append]
  );

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <Card className={`shadow-none w-full max-w-2xl  ${className}`}>
      <CardHeader className="bg-primary rounded-t-xl text-white">
        <CardTitle className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Link href={"/"}>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="rounded-full p-1 size-7"
              >
                <ArrowLeft />
              </Button>
            </Link>{" "}
            <span>Labeeb</span>
          </div>
          <IconLogo className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <ChatMessageArea
        className="space-y-4 p-2 h-[60vh] max-h-[60vh]"
        scrollButtonAlignment="center"
      >
        <CardContent className="space-y-4 p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500 motion-preset-blur-right space-y-6">
              <div className="text-center">
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm">Start a conversation with Labeeb AI</p>
              </div>
              <SuggestedPrompts onPromptClick={handlePromptClick} />
            </div>
          ) : (
            <ChatMessages messages={messages} status={status} />
          )}
        </CardContent>
      </ChatMessageArea>
      <CardFooter className="mt-2">
        <ChatInput
          variant="default"
          value={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={isLoading}
          onStop={stop}
        >
          <ChatInputTextArea placeholder="Type a message..." />
          <ChatInputSubmit />
        </ChatInput>
      </CardFooter>
    </Card>
  );
}
