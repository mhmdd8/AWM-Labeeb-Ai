"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import ChatBot from "./chat-bot";

export function FloatingChatBot() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      {showChat && <ChatBot className="md:w-[500px] shadow-lg -me-3 md:me-0" />}
      <Button
        size="icon"
        className="rounded-full md:size-9 shadow-lg"
        onClick={() => setShowChat(!showChat)}
      >
        {showChat ? (
          <X className="md:size-9 motion-preset-slide-up" />
        ) : (
          <MessageCircle className="md:size-9  motion-preset-expand" />
        )}
      </Button>
    </div>
  );
}
