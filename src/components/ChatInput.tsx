"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ImArrowDown2 } from "react-icons/im";
import { db } from "@/firebase";

const ChatInput = ({ id }: { id: string }) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [userIp, setUserIp] = useState("");
  const router = useRouter();
  const model = "gemini-2.0-flash";

  const fetchUserIp = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setUserIp(data.ip); 
    } catch (error) {
      console.error("Erro ao obter IP:", error);
    }
  };

  useEffect(() => {
    if (!session) {
      fetchUserIp(); 
    }
  }, [session]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const message = {
      text: prompt.trim(),
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email || userIp,
        name: session?.user?.name || "Usuário Anônimo", 
        avatar:
          session?.user?.image || "https://photos.app.goo.gl/rZpmoBeS3cxhC1CS7", // Avatar padrão
      },
    };

    try {
      setLoading(true);

      let chatDocumentId = id;
      if (!id) {
       
        if (!session) {
          toast.error("Por favor, faça login para criar um novo chat!");
          return;
        }

        const docRef = await addDoc(
          collection(db, "users", session?.user?.email || userIp, "chats"), 
          {
            userId: session?.user?.email || userIp, 
            createdAt: serverTimestamp(),
          }
        );
        chatDocumentId = docRef.id;
        router.push(`/chat/${chatDocumentId}`);
      }

      await addDoc(
        collection(
          db,
          "users",
          session?.user?.email || userIp,
          "chats",
          chatDocumentId,
          "messages"
        ),
        message
      );

      setPrompt("");

      const notifications = toast.loading("NoFriendAI está pensando...");

      const response = await fetch("/api/askchat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          id: chatDocumentId,
          model,
          session: session?.user?.email || userIp,
        }),
      });

      const data = await response.json();
      if (data?.success) {
        toast.success(data?.message, { id: notifications });
      } else {
        toast.error(data?.message, { id: notifications });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Algo deu errado, tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-3xl mx-auto pl-3">
      <form
        onSubmit={sendMessage}
        className="bg-white/10 rounded-full flex items-center px-4 py-2.5 w-full"
      >
        <input
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="bg-transparent text-white placeholder:text-gray-300 px-3 outline-none w-full"
          placeholder="Qual seria a sua dúvida?"
          autoFocus
        />
        <button
          type="submit"
          className="cursor-pointer rotate-270"
          disabled={!prompt || loading}
        >
          <ImArrowDown2 />
        </button>
      </form>
      <p className="mt-7 text-xs font-medium tracking-wide">
        O NoFriendAI te dará as melhores mensagens de flerte, apenas adapte para
        o seu modo de falar!
      </p>
    </div>
  );
};

export default ChatInput;
