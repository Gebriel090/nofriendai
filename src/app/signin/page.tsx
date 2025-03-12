"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SigninPage = () => {
  const { status } = useSession(); // Remova `session` se não for necessário
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-white">Carregando...</p>;
  }

  return (
    <div className="fixed w-full h-full bg-black/80 left-0 top-0 flex items-center justify-center">
      <div className="bg-[#2f2f2f] w-96 h-86 flex flex-col py-10 px-6 items-center justify-center rounded-lg">
        <p className="text-2xl font-bold tracking-wide text-white">
          Seja bem-vindo de volta
        </p>
        <p className="text-base tracking-wide mt-2 font-medium text-center text-gray-300">
          Faça o login para ter uma melhor experiência com o NoFriendAI
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-6 px-6 py-2 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-600 transition"
        >
          Entrar com Google
        </button>
      </div>
    </div>
  );
};

export default SigninPage;
