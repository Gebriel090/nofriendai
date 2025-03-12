"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  query,
  CollectionReference,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import { BiHome } from "react-icons/bi";
import { FiMenu } from "react-icons/fi"; // Ícone para abrir/fechar sidebar

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [chats, loading] = useCollection(
    session?.user?.email
      ? query(
          collection(
            db,
            "users",
            session.user.email,
            "chats"
          ) as unknown as CollectionReference,
          orderBy("createdAt", "asc")
        )
      : null
  );

  useEffect(() => {
    if (!loading && session?.user?.email && chats?.empty) {
      router.push("/");
    }
  }, [chats, loading, router, session]);

  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/fechar o sidebar

  return (
    <div className="relative flex">
      {/* Botão para abrir/fechar Sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-10 bg-transparent p-2 rounded-full"
      >
        <FiMenu className="text-white size-6 cursor-pointer -translate-y-[5px]" />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-transparent h-screen p-2.5 overflow-hidden transition-all duration-300 ${
          isOpen ? "w-[250px] translate-x-0" : "w-0 translate-x-[-165px]" // Movendo para -165px (10px a mais)
        }`}
      >
        <div className="flex items-center gap-1 mb-2">
          <div className="translate-x-35">
            <NewChat />
          </div>

          <Link href={"/"}>
            <BiHome className="ml-36 size-5 text-white" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {session?.user ? (
            <>
              {loading ? (
                <div className="flex flex-col flex-1 space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-8 rounded-md shrink-0 animate-pulse bg-zinc-800"
                    ></div>
                  ))}
                </div>
              ) : chats?.empty ? (
                <p className="text-gray-400 text-sm text-center mt-4">
                  Nenhum chat encontrado.
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {chats?.docs.map((chat) => (
                    <ChatRow key={chat.id} id={chat.id} />
                  ))}
                </div>
              )}
            </>
          ) : loading ? (
            <div className="text-sm font-medium text-center mt-10">
              <p>Por favor, entre para ver seu histórico</p>
              <Link
                href="/signin"
                className="text-xs hover:text-white duration-300 mt-2 underline decoration-[1px]"
              >
                Entrar
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
