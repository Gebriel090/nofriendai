"use client";

import { db } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BsArrowDownCircle } from "react-icons/bs";
import Message from "./Message";

const Chat = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const userEmail = session?.user?.email ?? "guest";

  const [messages, loading, error] = useCollection(
    session
      ? query(
          collection(db, "users", userEmail, "chats", id, "messages"),
          orderBy("createdAt", "asc")
        )
      : null
  );

  if (!session) {
    return <p>Você precisa estar autenticado para acessar o chat.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const isFirstMessage = messages?.empty;

  return (
    <div className="flex flex-col ml-[30px]">
      {isFirstMessage && (
        <div className="flex flex-col items-center gap-2 py-5">
          <p>Inicie a conversa com uma pergunta!</p>
          <BsArrowDownCircle className="text-xl text-green-300 animate-bounce" />
        </div>
      )}
      {messages?.docs?.map((doc) => (
        <div key={doc.id}>
          <Message
            message={{
              ...doc.data(),
              user: {
                ...doc.data().user,
                avatar: doc.data().user.avatar?.includes("949aeu4LkB4etLYHA")
                  ? "https://photos.app.goo.gl/rZpmoBeS3cxhC1CS7"
                  : doc.data().user.avatar,
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Chat;
