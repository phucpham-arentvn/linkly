"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import GoogleIcon from "./icons/GoogleIcon";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-1">
        <Image src="/logo.svg" alt="Linkly" width={140} height={32} />
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => signIn("google")}
          className="btn btn-primary btn-outline flex items-center gap-2"
        >
          <GoogleIcon />
          Login with Google
        </button>
      </div>
    </div>
  );
}
