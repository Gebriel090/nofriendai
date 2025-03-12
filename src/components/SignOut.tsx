// SignOut.tsx
"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button type="submit" className="text-sm underline">
        Sair
      </button>
    </form>
  );
};

export default SignOut;
