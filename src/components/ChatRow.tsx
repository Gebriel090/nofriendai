import { db } from "@/firebase";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const ChatRow = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email as string,
          "chats",
          id,
          "messages"
        )
      )
  );

  const chat = messages?.docs[messages?.docs?.length - 1]?.data();
  const chatText = chat?.text || "Novo chat";

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname, id]);

  const handleRemoveChat = async () => {
    await deleteDoc(
      doc(db, "users", session?.user?.email as string, "chats", id)
    );
    if (active) {
      const nextChat = messages?.docs?.find((chat) => chat.id !== id);
      if (nextChat) {
        router.push(`/chat/${nextChat.id}`);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <Link
      href={`/chat/${id}`}
      className="flex gap-2 items-center justify-between px-2 py-1.5 mb-2 hover:bg-white/10 rounded-md duration-300 ease-in-out"
    >
      <IoChatboxOutline />
      <motion.p
        className={`truncate flex-1 text-sm font-medium tracking-wide text-white/80 sm:inline-flex ${
          active ? "text-[#0082FF]" : "text-white/80"
        }`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {chatText}
      </motion.p>
      <BiSolidTrashAlt
        onClick={(e) => {
          e.preventDefault();
          handleRemoveChat();
        }}
        className="text-white/50 hover:text-red-700 duration-300 ease-in-out cursor-pointer"
      />
    </Link>
  );
};

export default ChatRow;
