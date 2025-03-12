// notFound.tsx

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#212121] text-white">
      <h1 className="text-4xl font-bold mb-4">Essa página não existe...</h1>
      <p className="text-xl mb-6 text-gray-400">
        Parece que você tentou acessar uma página que não está disponível.
      </p>
      <Link
        href={"/"}
        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
