"use client";

import AuthLoginForm from "@/app/components/AuthLoginForm";
import React, { useEffect } from "react";
import {
  signIn,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "../../../public/assets/icons/google-icon.png";

export default function AuthLoginPage() {
  const { data: session } = useSession();

  const [providers, setProviders] = React.useState<Record<
    LiteralUnion<string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const myProviders = async () => {
      const response = await getProviders();

      setProviders(response);
      console.log("LOGIN PAGE: SESSION: ", session);
    };

    myProviders();
  }, [session]);
  return (
    <>
      {session?.user ? (
        <div className="w-full min-h-[calc(100vh_-_150px)] flex flex-col items-center justify-center gap-2">
          <h3 className="text-3xl font-bold text-green-600">Zalogowano</h3>
          <p>
            <Link href={"/"} className="text-blue-700">
              Wróć
            </Link>{" "}
            na stronę główną.
          </p>
        </div>
      ) : (
        <div className="h-[calc(100vh_-_150px)]">
          <div className="flex flex-col items-center">
            <div className="w-1/4">
              <AuthLoginForm />
            </div>
            <div className="w-1/4 flex items-center">
              <hr className="border-[2px] border-black w-full" />
              <p className="uppercase px-4">lub</p>
              <hr className="border-[2px] border-black w-full" />
            </div>
            <div className="pb-6">
              {providers &&
                Object.values(providers).map((provider: ClientSafeProvider) => (
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
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
