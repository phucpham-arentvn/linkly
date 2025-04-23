"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from "./icons/GoogleIcon";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-1">
        <Image src="/logo.svg" alt="Linkly" width={140} height={32} />
      </div>
      <div className="flex gap-4">
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn py-6">
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <div className="flex flex-col items-start">
                  <span className="text-xs opacity-70">Welcome</span>
                  <span className="text-sm font-medium">
                    {session.user.name}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
            >
              <li>
                <button onClick={() => signOut()}>Sign out</button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="btn btn-primary btn-outline flex items-center gap-2"
          >
            <GoogleIcon />
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}
