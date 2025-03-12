import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SignOut from "./SignOut";

const Header = async () => {
  const session = await auth();
  console.log(session)
  return (
    
    <div className="flex items-center justify-between m-2.5 h-10 absolute w-full top-0 left-0 pl-2 pr-12">
      <h1 className="LogoName">NoFriendAI</h1>
      {session?.user ? (
        <div className="flex items-center">
          <Image
            src={session.user.image as string}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-5">
            <SignOut />
          </div>
        </div>
      ) : (
        <Link href="/signin" className="text-sm font-semibold">
          Entrar
        </Link>
      )}
    </div>
  );
};

export default Header;
