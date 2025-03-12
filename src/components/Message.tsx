import React from "react";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
  message: DocumentData;
}

const Message = ({ message }: MessageProps) => {
  const inChat = message?.user?.name === "NoFriendAI";
  const isCode = message?.text.includes("```");

  return (
    <div className="message py-3 px-4 md:px-10 flex justify-center">
      <div
        className={`flex items-start w-full max-w-4xl ${
          inChat
            ? "flex-row justify-start ml-[33px] lg:ml-[48px]" // Distância para dispositivos maiores
            : "flex-row-reverse justify-end ml-[20px] md:ml-[30px] lg:ml-[120px]" // Distância para telas maiores
        }`}
        style={{
          gap: "12px",
        }}
      >
        <div className="w-8 h-8 flex-shrink-0">
          <Image
            src={
              message?.user?.avatar ||
              "https://photos.app.goo.gl/rZpmoBeS3cxhC1CS7"
            }
            alt="userAvatar"
            width={32}
            height={32}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div
          className={`px-4 py-2 rounded-md text-sm md:text-base ${
            inChat ? "text-gray-300 bg-[#2A2A2A]" : "text-gray-200 bg-[#2A2A2A]"
          }`}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            maxWidth: "500px",
            width: "fit-content",
            marginBottom: "16px", // espaçamento vertical entre os balões
          }}
        >
          <div className="m-0 break-words">
            {isCode ? (
              <pre className="bg-[#1d1d1d] text-white p-3 rounded-md font-mono text-sm">
                <code>{message?.text}</code>
              </pre>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message?.text}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
