"use client";

import AuthRegisterForm from "@/app/components/AuthRegisterForm";
import {
  getProviders,
  useSession,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import GoogleIcon from "../../../public/assets/icons/google-icon.png";

export default function AuthRegisterPage() {
  const { data: session } = useSession();
  //const [email, setEmail] = useState("");

  const [providers, setProviders] = React.useState<Record<
    LiteralUnion<string>,
    ClientSafeProvider
  > | null>(null);

  // const handleEmailLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (email) {
  //     await signIn("email", { email });
  //   }
  // };

  useEffect(() => {
    const myProviders = async () => {
      const response = await getProviders();

      setProviders(response);
      console.log("REG PAGE: SESSION: ", session);
    };

    myProviders();
  }, [session]);
  return (
    <div className="min-h-[calc(100vh_-_150px)]">
      <div className="flex flex-col items-center">
        <div className="w-1/4">
          <AuthRegisterForm />
        </div>
        <div className="w-1/4 flex items-center">
          <hr className="border-[2px] border-black w-full" />
          <p className="uppercase px-4">lub</p>
          <hr className="border-[2px] border-black w-full" />
        </div>
        {providers &&
          Object.values(providers).map((provider: ClientSafeProvider) =>
            provider.id === "google" ? (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className={
                  "black_btn flex items-center justify-center gap-4 border border-black rounded-md py-2 px-4 hover:bg-slate-400 mt-6"
                }
              >
                <Image
                  src={GoogleIcon}
                  alt="google-icon"
                  width={32}
                  height={32}
                />
                Zaloguj przez Google
              </button>
            ) : null
          )}
        {/* Email login form
        <form className="mt-6 w-1/4" onSubmit={handleEmailLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-black rounded-md"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="black_btn flex items-center justify-center border border-black rounded-md py-2 px-4 hover:bg-slate-400 mt-6"
          >
            Sign in with Email
          </button>
        </form> */}
      </div>
    </div>
  );
}
