"use client";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Importado de next/navigation
import { FaPencilAlt } from "react-icons/fa";
import { db } from "@/firebase"; // Certifique-se de importar seu db corretamente

const NewChat = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const userEmail = session?.user?.email || "unknown";

  const createNewChat = async () => {
    try {
      const doc = await addDoc(collection(db, "users", userEmail, "chats"), {
        userId: userEmail,
        createAt: serverTimestamp(),
      });
      router.push(`/chat/${doc.id}`);
    } catch (error) {
      console.error("Erro ao criar o chat:", error);
    }
  };

  return (
    <button
      onClick={createNewChat}
      className="flex items-center px-4 py-2 cursor-pointer text-white rounded-md "
    >
      <FaPencilAlt className="mr-2" />
    </button>
  );
};

export default NewChat;
