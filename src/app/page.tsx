import ChatInput from "../components/ChatInput";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col px-2">
      <div className="max-w-4xl mx-auto flex flex-col w-full items-center gap-5 flex-grow">
        <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#ff0000] via-[#0083ff] to-[#0083ff] bg-clip-text text-transparent mt-[350px] md:mt-[300px]">
          Quais serão os flertes de hoje?
        </h2>
      </div>

      <div className="w-full mt-auto mb-[400px] md:mb-[40px]">
        <ChatInput id={"Ola"} />
      </div>
    </main>
  );
}
