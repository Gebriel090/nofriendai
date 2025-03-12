"use client";

import { useSession } from "next-auth/react";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const ChatPage = () => {
  const { id } = useParams();
  const { status } = useSession(); // Remova `session` se não for utilizado
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [router, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const chatId = Array.isArray(id) ? id[0] : id;

  if (!chatId) {
    return <p>Error: ID not found.</p>;
  }

  return (
    <div className="flex flex-col justify-center h-screen p-5 overflow-hidden">
      <div className="flex-1 overflow-y-scroll custom-scrollbar pt-10">
        <Chat id={chatId} />
      </div>
      <ChatInput id={chatId} />
    </div>
  );
};

export default ChatPage;
